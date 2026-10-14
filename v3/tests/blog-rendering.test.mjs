import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { load, minify, compressionDefaults } from './helpers/production-html.mjs';

// Load the real Astro components in memory: no listening server or full site build.
const astroRoot = new URL('./', import.meta.resolve('astro/package.json'));
const { resolveConfig, createSettings, createNodeLogger } = await import(
  new URL('dist/core/config/index.js', astroRoot)
);
const { createContainer } = await import(new URL('dist/core/dev/container.js', astroRoot));
let compiler;
let renderer;

before(async () => {
  const inlineConfig = {
    root: fileURLToPath(new URL('../', import.meta.url)),
    logLevel: 'error',
    devToolbar: { enabled: false },
    vite: { server: { middlewareMode: true, ws: false, watch: null } },
  };
  const { astroConfig } = await resolveConfig(inlineConfig, 'dev');
  const settings = await createSettings(astroConfig, fileURLToPath(astroConfig.root));
  compiler = await createContainer({ settings, logger: createNodeLogger(inlineConfig), inlineConfig });
  renderer = await AstroContainer.create();
});

after(async () => {
  await compiler?.close();
});

async function render(component, props, path = '/zh-cn/blog/example') {
  const { default: Component } = await compiler.viteServer.ssrLoadModule(`/src/${component}`);
  return renderer.renderToString(Component, { props, request: new Request(`https://rustdesk.com${path}`) });
}

const articleProps = {
  type: 'article',
  lang: 'zh-cn',
  metadata: { title: '示例文章' },
  article: { title: '示例文章', publishDate: new Date('2026-07-09T10:47:00Z') },
};

test('FAQ command placeholders survive the production HTML compressor as valid JSON-LD', async () => {
  const answer = 'Run rustdesk --deploy --token <api_token> on each new device.';
  const html = await render('components/common/StructuredData.astro', {
    ...articleProps,
    faqItems: [{ question: 'How do I enroll a device?', answer }],
  });
  const compressed = await minify(html, { ...compressionDefaults, removeAttributeQuotes: false });
  const graph = JSON.parse(load(compressed)('script[type="application/ld+json"]').html())['@graph'];
  assert.equal(graph.find((item) => item['@type'] === 'FAQPage').mainEntity[0].acceptedAnswer.text, answer);
});

test('FAQ text cannot terminate its JSON-LD script or inject an HTML element', async () => {
  const answer = 'Literal </script><div id="injected">example</div> text.';
  const html = await render('components/common/StructuredData.astro', {
    ...articleProps,
    faqItems: [{ question: 'What is a literal example?', answer }],
  });
  const $ = load(await minify(html, { ...compressionDefaults, removeAttributeQuotes: false }));
  const graph = JSON.parse($('script[type="application/ld+json"]').html())['@graph'];
  assert.equal(graph.find((item) => item['@type'] === 'FAQPage').mainEntity[0].acceptedAnswer.text, answer);
  assert.equal($('#injected').length, 0);
});

test('an explicitly translated page labels its article and FAQ in that language', async () => {
  const html = await render('components/common/StructuredData.astro', {
    ...articleProps,
    faqItems: [{ question: '问题', answer: '回答' }],
  });
  const graph = JSON.parse(load(html)('script[type="application/ld+json"]').html())['@graph'];
  for (const type of ['WebPage', 'BlogPosting', 'FAQPage']) {
    assert.equal(graph.find((item) => item['@type'] === type).inLanguage, 'zh-CN', type);
  }
});

test('a translated article breadcrumb links to its own language blog', async () => {
  const html = await render('components/common/StructuredData.astro', articleProps);
  const graph = JSON.parse(load(html)('script[type="application/ld+json"]').html())['@graph'];
  const items = graph.find((item) => item['@type'] === 'BreadcrumbList').itemListElement;
  assert.equal(items[1].item, 'https://rustdesk.com/zh-cn/blog');
});

const post = {
  id: 'zh-cn/example.md',
  lang: 'zh-cn',
  translationKey: 'example',
  slug: 'example',
  permalink: 'zh-cn/blog/example',
  title: '示例文章',
  publishDate: new Date('2026-07-09T10:47:00Z'),
  updateDate: new Date('2026-10-14T00:00:00Z'),
  tags: [],
};

test('article publication and update times expose ISO timestamps', async () => {
  const $ = load(
    await render('components/blog/SinglePost.astro', { post, url: 'https://rustdesk.com/zh-cn/blog/example' })
  );
  assert.deepEqual(
    $('time')
      .map((_, item) => $(item).attr('datetime'))
      .get(),
    ['2026-07-09T10:47:00.000Z', '2026-10-14T00:00:00.000Z']
  );
});

test('blog list cards expose the publication time as an ISO timestamp', async () => {
  const $ = load(await render('components/blog/ListItem.astro', { post }));
  assert.equal($('time').attr('datetime'), '2026-07-09T10:47:00.000Z');
});
