import assert from 'node:assert/strict';
import test from 'node:test';

import { shouldIncludeInSitemap } from '../src/utils/sitemap.mjs';

const locales = ['en', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'zh-cn', 'zh-tw', 'ko', 'ar'];

test('excludes noindex utility routes from the sitemap', () => {
  for (const path of ['/404', '/cancel', '/success', '/de/cancel', '/zh-cn/success']) {
    assert.equal(shouldIncludeInSitemap(`https://rustdesk.com${path}`, locales), false, path);
  }
});

test('excludes tag archives in every locale from the sitemap', () => {
  for (const path of ['/tag/rustdesk', '/fr/tag/rustdesk', '/zh-tw/tag/rustdesk/2']) {
    assert.equal(shouldIncludeInSitemap(`https://rustdesk.com${path}`, locales), false, path);
  }
});

test('excludes noindex blog pagination in every locale', () => {
  for (const path of ['/blog/2', '/de/blog/6', '/zh-cn/blog/3']) {
    assert.equal(shouldIncludeInSitemap(`https://rustdesk.com${path}`, locales), false, path);
  }
});

test('keeps indexable pages whose later path segments resemble excluded routes', () => {
  for (const path of ['/', '/pricing', '/blog/tag', '/de/blog/success', '/category/tag']) {
    assert.equal(shouldIncludeInSitemap(`https://rustdesk.com${path}`, locales), true, path);
  }
});
