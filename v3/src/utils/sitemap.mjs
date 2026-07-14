const NON_INDEXABLE_SECTIONS = new Set(['404', 'cancel', 'success', 'tag']);

/**
 * Keep sitemap entries aligned with the routes that are allowed to be indexed.
 * Astro passes absolute page URLs to the sitemap filter.
 */
export const shouldIncludeInSitemap = (pageUrl, locales = []) => {
  const segments = new URL(pageUrl).pathname.split('/').filter(Boolean);

  if (locales.includes(segments[0])) {
    segments.shift();
  }

  const blogPage = Number(segments[1]);
  const isNoindexBlogPagination = segments[0] === 'blog' && /^\d+$/.test(segments[1] ?? '') && blogPage > 1;

  return !NON_INDEXABLE_SECTIONS.has(segments[0]) && !isNoindexBlogPagination;
};
