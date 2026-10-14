import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import slugify from 'limax';
import { load } from './helpers/production-html.mjs';

async function* htmlFiles(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, item.name);
    if (item.isDirectory()) yield* htmlFiles(path);
    else if (item.name.endsWith('.html')) yield path;
  }
}

const normalizedText = (text) => text.replace(/\s+/g, ' ').trim();
const withoutTrailingSlash = (path) => path.replace(/\/$/, '') || '/';

async function publishedPostPaths() {
  const paths = new Set();
  const root = fileURLToPath(new URL('../src/content/post/', import.meta.url));
  for (const language of await readdir(root)) {
    for (const name of await readdir(resolve(root, language))) {
      if (!/\.mdx?$/.test(name)) continue;
      const source = await readFile(resolve(root, language, name), 'utf8');
      const data = yaml.load(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
      if (data.draft) continue;
      const slug = slugify(
        String(data.slug || basename(name).replace(/\.mdx?$/, ''))
          .split('/')
          .pop()
      );
      paths.add(`${data.lang === 'en' ? '' : `/${data.lang}`}/blog/${slug}`);
    }
  }
  return paths;
}

// Run after `npm run build`: node tests/verify-blog-build.mjs [dist-directory]
// This checks the actual compressed output, including Layout -> metadata propagation.
export async function verifyBlogBuild(directory = fileURLToPath(new URL('../dist/', import.meta.url))) {
  const pages = new Map();
  for await (const file of htmlFiles(directory)) {
    const path = `/${file
      .slice(resolve(directory).length + 1)
      .replace(/index\.html$/, '')
      .replace(/\/$/, '')}`;
    pages.set(path, { file, html: await readFile(file, 'utf8') });
  }

  let posts = 0;
  let faqs = 0;
  const languages = new Set();
  const failures = [];
  const expectedPaths = await publishedPostPaths();
  const observedPaths = new Set();
  for (const [path, { file, html }] of pages) {
    if (!/^\/(?:[a-z-]+\/)?blog\/[^/]+$/.test(path) || /\/\d+$/.test(path)) continue;
    observedPaths.add(path);
    const $ = load(html);
    try {
      const scripts = $('script[type="application/ld+json"]').toArray();
      assert.ok(scripts.length > 0, 'article must expose JSON-LD');
      const graph = scripts.flatMap((script) => JSON.parse($(script).html())['@graph'] || []);
      const article = graph.find((item) => item['@type'] === 'BlogPosting');
      assert.ok(article, 'article must expose BlogPosting');
      posts += 1;
      const language = $('html').attr('lang');
      languages.add(language);
      for (const item of graph.filter((item) => ['WebPage', 'BlogPosting', 'FAQPage'].includes(item['@type']))) {
        assert.equal(item.inLanguage, language, `${item['@type']} language must match the page`);
      }

      const openGraphLocale = $('meta[property="og:locale"]').attr('content');
      const [languageCode, territory] = language.split('-');
      assert.match(
        openGraphLocale || '',
        new RegExp(`^${languageCode}_[A-Z]{2}$`),
        'Open Graph needs the page language and territory'
      );
      if (territory) assert.equal(openGraphLocale, `${languageCode}_${territory}`);

      const canonical = $('link[rel="canonical"]').attr('href');
      assert.equal(withoutTrailingSlash(new URL(canonical).pathname), path, 'article canonical must point to itself');
      assert.equal(article.url, canonical, 'BlogPosting and HTML must share the canonical URL');
      for (const alternate of $('link[rel="alternate"][hreflang]').toArray()) {
        const alternatePath = withoutTrailingSlash(new URL($(alternate).attr('href')).pathname);
        assert.ok(pages.has(alternatePath), `alternate must exist: ${alternatePath}`);
      }

      const localePrefix = languageCode === 'en' ? '' : `/${language.toLowerCase()}`;
      const breadcrumb = graph.find((item) => item['@type'] === 'BreadcrumbList');
      assert.equal(
        breadcrumb?.itemListElement[1]?.item,
        `https://rustdesk.com${localePrefix}/blog`,
        'breadcrumb must keep the article language'
      );
      for (const time of $('time').toArray()) {
        const value = $(time).attr('datetime');
        assert.match(value || '', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, 'time datetime must use ISO format');
        assert.ok(Number.isFinite(Date.parse(value)), 'time datetime must represent a real date');
      }

      const faq = graph.find((item) => item['@type'] === 'FAQPage');
      const visibleFaq = $('#post-faq-heading').closest('section').find('details').toArray();
      if (faq) {
        faqs += 1;
        const heading = normalizedText($('#post-faq-heading').text());
        assert.ok(heading, 'visible FAQ needs a heading');
        if (language !== 'en') assert.notEqual(heading, 'Frequently asked questions', 'FAQ heading must be localized');
        assert.equal(visibleFaq.length, faq.mainEntity.length, 'every FAQ answer must also be visible');
        faq.mainEntity.forEach((item, index) => {
          assert.equal(
            normalizedText($(visibleFaq[index]).find('summary').text()),
            normalizedText(item.name),
            'FAQ question must match visible text'
          );
          assert.equal(
            normalizedText($(visibleFaq[index]).find('p').text()),
            normalizedText(item.acceptedAnswer.text),
            'FAQ answer must match visible text'
          );
        });
      } else {
        assert.equal(visibleFaq.length, 0, 'visible FAQ must expose matching structured data');
      }
    } catch (error) {
      failures.push(`${file}: ${error.message}`);
    }
  }
  assert.ok(posts > 0, 'build must contain blog articles');
  assert.deepEqual(
    [...observedPaths].sort(),
    [...expectedPaths].sort(),
    'build must contain exactly the published source articles'
  );
  assert.equal(
    failures.length,
    0,
    `Built blog validation failed (${failures.length} pages):\n${failures.slice(0, 12).join('\n')}`
  );
  return { posts, faqs, languages: [...languages].sort() };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await verifyBlogBuild(process.argv[2]);
  console.log(
    `Validated ${result.posts} blog articles, ${result.faqs} visible FAQ blocks, ${result.languages.length} languages.`
  );
}
