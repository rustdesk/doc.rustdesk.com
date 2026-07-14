import type { APIRoute } from 'astro';

import { BLOCKED_CRAWLERS, SITEMAP_PATHS, getSiteOrigin } from '~/utils/seo';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const lines = [
    '# RustDesk - robots.txt',
    `# ${origin}`,
    '',
    '# Every crawler is welcome, AI crawlers included. A bot with no group of its own',
    '# falls back to this group, so new ones never need an entry here.',
    'User-agent: *',
    'Allow: /',
    'Disallow: /success',
    'Disallow: /cancel',
    '',
    '# Bulk scrapers that feed training corpora and send back no readers.',
    ...BLOCKED_CRAWLERS.flatMap((name) => [`User-agent: ${name}`, 'Disallow: /', '']),
    ...SITEMAP_PATHS.map((path) => `Sitemap: ${origin}${path}`),
    `Host: ${new URL(origin).host}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
