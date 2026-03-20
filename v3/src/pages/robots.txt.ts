import type { APIRoute } from 'astro';

import { AI_CRAWLER_POLICIES, getSiteOrigin } from '~/utils/seo';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /success',
    'Disallow: /cancel',
    '',
    ...AI_CRAWLER_POLICIES.flatMap((policy) => [
      `User-agent: ${policy.name}`,
      `Allow: ${policy.allow}`,
      'Disallow: /success',
      'Disallow: /cancel',
      '',
    ]),
    `Sitemap: ${origin}/sitemap-index.xml`,
    `Host: ${new URL(origin).host}`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
