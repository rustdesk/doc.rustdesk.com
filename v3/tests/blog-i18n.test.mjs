import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPostAlternates,
  findTranslatedPost,
  groupPostsByTranslationKey,
  localizedPath,
  validatePostTranslations,
} from '../src/utils/blog-i18n.mjs';

const posts = [
  {
    lang: 'en',
    translationKey: 'acl-1-5',
    slug: 'acl',
    permalink: 'blog/2025/02/acl',
  },
  {
    lang: 'zh-cn',
    translationKey: 'acl-1-5',
    slug: '增强-acl',
    permalink: 'zh-cn/blog/2025/02/增强-acl',
  },
];

test('groups and resolves translations by stable key', () => {
  assert.equal(groupPostsByTranslationKey(posts).get('acl-1-5').length, 2);
  assert.equal(findTranslatedPost(posts[0], posts, 'zh-cn'), posts[1]);
});

test('builds localized and default-locale paths', () => {
  assert.equal(localizedPath('en', 'blog'), '/blog');
  assert.equal(localizedPath('ja', 'blog'), '/ja/blog');
  assert.equal(localizedPath('zh-cn', 'blog/2025/02/增强-acl'), '/zh-cn/blog/2025/02/增强-acl');
});

test('reports missing locales and duplicate locale entries', () => {
  assert.throws(() => validatePostTranslations(posts, ['en', 'zh-cn', 'de']), /missing locale de/i);
  assert.throws(
    () => validatePostTranslations([...posts, { ...posts[0], slug: 'acl-copy' }], ['en', 'zh-cn']),
    /duplicate locale en/i
  );
});

test('rejects unsupported locales and duplicate slugs in one locale', () => {
  assert.throws(() => validatePostTranslations([{ ...posts[0], lang: 'xx' }], ['en']), /unsupported locale xx/i);
  assert.throws(
    () =>
      validatePostTranslations(
        [
          { ...posts[0], translationKey: 'a', slug: 'same' },
          { ...posts[0], translationKey: 'b', slug: 'same' },
        ],
        ['en']
      ),
    /duplicate slug same/i
  );
});

test('rejects a locale that does not match the content directory', () => {
  assert.throws(
    () => validatePostTranslations([{ ...posts[0], id: 'zh-cn/acl.md' }], ['en', 'zh-cn']),
    /directory zh-cn does not match locale en/i
  );
});

test('builds alternate links from actual translated permalinks', () => {
  assert.deepEqual(buildPostAlternates(posts[0], posts, ['en', 'zh-cn']), [
    { lang: 'en', path: '/blog/2025/02/acl' },
    { lang: 'zh-cn', path: '/zh-cn/blog/2025/02/增强-acl' },
  ]);
});
