const DEFAULT_LOCALE = 'en';

const trimSlashes = (value = '') => String(value).replace(/^\/+|\/+$/g, '');

export const localizedPath = (lang, path = '') => {
  const segments = [lang === DEFAULT_LOCALE ? '' : lang, trimSlashes(path)].filter(Boolean);
  return segments.length ? `/${segments.join('/')}` : '/';
};

export function groupPostsByTranslationKey(posts) {
  const groups = new Map();
  for (const post of posts) {
    const group = groups.get(post.translationKey) || [];
    group.push(post);
    groups.set(post.translationKey, group);
  }
  return groups;
}

export const findTranslatedPost = (post, posts, lang) =>
  posts.find((candidate) => candidate.translationKey === post.translationKey && candidate.lang === lang);

export function validatePostTranslations(posts, locales) {
  const supportedLocales = new Set(locales);
  const slugs = new Set();

  for (const post of posts) {
    if (!supportedLocales.has(post.lang)) {
      throw new Error(`Post ${post.translationKey} uses unsupported locale ${post.lang}`);
    }

    const directory = post.id?.split('/')[0];
    if (directory && supportedLocales.has(directory) && directory !== post.lang) {
      throw new Error(`Post directory ${directory} does not match locale ${post.lang}`);
    }

    const slugKey = `${post.lang}:${post.slug}`;
    if (slugs.has(slugKey)) {
      throw new Error(`Post locale ${post.lang} has duplicate slug ${post.slug}`);
    }
    slugs.add(slugKey);
  }

  for (const [translationKey, group] of groupPostsByTranslationKey(posts)) {
    if (group.length === 1) continue;

    for (const locale of locales) {
      const count = group.filter((post) => post.lang === locale).length;
      if (count === 0) {
        throw new Error(`Translation group ${translationKey} is missing locale ${locale}`);
      }
      if (count > 1) {
        throw new Error(`Translation group ${translationKey} has duplicate locale ${locale}`);
      }
    }
  }
}

export const buildPostAlternates = (post, posts, locales) =>
  locales.map((lang) => {
    const translated = findTranslatedPost(post, posts, lang);
    return {
      lang,
      path: translated ? `/${trimSlashes(translated.permalink)}` : localizedPath(lang, 'blog'),
    };
  });
