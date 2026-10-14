import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import yaml from 'js-yaml';
import slugify from 'limax';

import { localizedPath, validatePostTranslations } from '../src/utils/blog-i18n.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const postsDir = join(root, 'src/content/post');
const locales = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'zh-cn', 'zh-tw', 'ar'];

const posts = locales.flatMap((lang) =>
  readdirSync(join(postsDir, lang))
    .filter((name) => /\.(md|mdx)$/.test(name))
    .map((name) => {
      const id = lang + '/' + name;
      const source = readFileSync(join(postsDir, id), 'utf8');
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      assert.ok(frontmatter, id + ' needs YAML frontmatter');
      const data = yaml.load(frontmatter[1]);
      assert.ok(data && typeof data === 'object', id + ' needs an object frontmatter');
      return {
        ...data,
        id,
        slug: slugify(data.slug || basename(name).replace(/\.(md|mdx)$/, '')),
        source,
      };
    })
    .filter((post) => !post.draft)
);

test('published content can be loaded with valid dates and nonempty FAQ entries', () => {
  assert.ok(posts.length > 0, 'the publication batch must not be empty');
  for (const post of posts) {
    assert.ok(typeof post.title === 'string' && post.title.trim(), post.id + ' needs a title');
    assert.ok(
      typeof post.translationKey === 'string' && post.translationKey.trim(),
      post.id + ' needs a translation key'
    );
    assert.ok(
      post.publishDate instanceof Date && !Number.isNaN(post.publishDate.valueOf()),
      post.id + ' needs a publication date'
    );
    if (post.updateDate) {
      assert.ok(
        post.updateDate instanceof Date && !Number.isNaN(post.updateDate.valueOf()),
        post.id + ' has an invalid update date'
      );
      assert.ok(post.updateDate >= post.publishDate, post.id + ' update cannot precede publication');
    }
    for (const item of post.faq || []) {
      assert.ok(typeof item.question === 'string' && item.question.trim(), post.id + ' has an empty FAQ question');
      assert.ok(typeof item.answer === 'string' && item.answer.trim(), post.id + ' has an empty FAQ answer');
    }
  }
});

test('published translations satisfy the production locale and uniqueness rules', () => {
  assert.doesNotThrow(() => validatePostTranslations(posts, locales));
});

test('published posts link to existing blog articles in the requested locale', () => {
  const articlePaths = new Set(posts.map((post) => localizedPath(post.lang, 'blog/' + post.slug)));
  for (const post of posts) {
    const body = post.source.replace(/~~~[\s\S]*?~~~|```[\s\S]*?```/g, '');
    for (const match of body.matchAll(/\]\((\/(?:[a-z-]+\/)?blog\/[^)\s]+)\)/g)) {
      const path = decodeURI(match[1].split(/[?#]/)[0]).replace(/\/$/, '');
      assert.ok(articlePaths.has(path), post.id + ' links to an unpublished blog route: ' + match[1]);
    }
  }
});

test('published article images resolve to local assets', () => {
  for (const post of posts) {
    if (!post.image?.startsWith('~/')) continue;
    const path = join(root, 'src', post.image.slice(2));
    assert.ok(existsSync(path), post.id + ' references a missing image: ' + post.image);
  }
});

const englishByKey = new Map(posts.filter((post) => post.lang === 'en').map((post) => [post.translationKey, post]));
const codePoints = (text) => [...text].length;

test('FAQ answers are plain text and translations keep the English FAQ', () => {
  for (const post of posts) {
    const faq = post.faq || [];
    const questions = new Set();
    const answers = new Set();
    for (const { question, answer } of faq) {
      // Answers render as plain text and feed FAQPage JSON-LD, so markdown would show raw.
      assert.doesNotMatch(answer, /\]\(|\*\*|`/, post.id + ' has markdown in the answer to: ' + question);
      assert.ok(!questions.has(question), post.id + ' repeats the FAQ question: ' + question);
      assert.ok(!answers.has(answer), post.id + ' gives the same answer to two FAQ questions');
      questions.add(question);
      answers.add(answer);
    }
    const english = englishByKey.get(post.translationKey);
    if (english && english !== post) {
      assert.equal(faq.length, (english.faq || []).length, post.id + ' must have as many FAQ entries as ' + english.id);
    }
  }
});

test('posts do not repeat a paragraph', () => {
  for (const post of posts) {
    const body = post.source
      .replace(/^---[\s\S]*?\n---/, '')
      .replace(/~~~[\s\S]*?~~~|```[\s\S]*?```/g, '');
    const seen = new Set();
    for (const block of body.split(/\n\s*\n/)) {
      const text = block.trim();
      if (codePoints(text) < 80 || /^[|<#]|^import /.test(text)) continue;
      assert.ok(!seen.has(text), post.id + ' repeats the paragraph: ' + text.slice(0, 80));
      seen.add(text);
    }
  }
});

test('meta descriptions fit a search snippet', () => {
  for (const post of posts) {
    const text = post.metadata?.description || post.excerpt || '';
    assert.ok(codePoints(text) <= 160, post.id + ' meta description is ' + codePoints(text) + ' characters');
  }
});

test('license upgrades are described as a one-year extension, not as proration', () => {
  // The official FAQ: an upgrade extends expiry to a full year and credits the remaining paid value.
  const proration = /prorat|prorrate|prorata|pro rata|pro-rata|anteilig|按比例|日割り|일할|비례 정산|تناسبي/i;
  for (const post of posts) {
    assert.doesNotMatch(post.source, proration, post.id + ' describes license upgrades as prorated');
  }
});
