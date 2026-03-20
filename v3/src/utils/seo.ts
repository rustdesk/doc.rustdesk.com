import { LOCALES, type Lang } from '@/i18n';
import type { MetaData } from '~/types';

export const SITE_NAME = 'RustDesk';
export const SITE_URL = 'https://rustdesk.com';
export const TECHNICAL_FAQ_URL = 'https://github.com/rustdesk/rustdesk/wiki/FAQ';
export const DEFAULT_SITE_DESCRIPTION =
  'RustDesk is open-source remote desktop software with self-hosted server options for secure remote access, support, and device management.';

const localizedPageKinds = [
  'pricing',
  'support',
  'team',
  'open-source',
  'blog',
  'category',
  'tag',
  'privacy',
  'terms',
  'success',
  'cancel',
] as const;

export type PageKind =
  | 'home'
  | 'pricing'
  | 'support'
  | 'team'
  | 'open-source'
  | 'blog'
  | 'blog-post'
  | 'blog-category'
  | 'blog-tag'
  | 'privacy'
  | 'terms'
  | 'success'
  | 'cancel'
  | 'utility'
  | 'page';

export const getSiteOrigin = (site?: URL | string) => String(site || SITE_URL).replace(/\/$/, '');

export const getLocaleLanguageTag = (locale?: string) => {
  if (!locale) return 'en';
  return LOCALES[locale as Lang]?.lang || locale;
};

export const stripLocalePrefix = (pathname: string) => {
  const localePattern = Object.keys(LOCALES)
    .sort((a, b) => b.length - a.length)
    .map((locale) => locale.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  if (!localePattern) return pathname || '/';

  const normalized = pathname || '/';
  const withoutLocale = normalized.replace(new RegExp(`^/(${localePattern})(?=/|$)`), '');
  return withoutLocale || '/';
};

export const getPageKind = (pathname: string): PageKind => {
  const path = stripLocalePrefix(pathname);
  const segments = path.split('/').filter(Boolean);

  if (path === '/') return 'home';
  if (path === '/pricing') return 'pricing';
  if (path === '/support') return 'support';
  if (path === '/team') return 'team';
  if (path === '/open-source') return 'open-source';
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  if (path === '/success') return 'success';
  if (path === '/cancel') return 'cancel';
  if (path === '/404') return 'utility';
  if (path === '/blog') return 'blog';
  if (path.startsWith('/category/')) return 'blog-category';
  if (path.startsWith('/tag/')) return 'blog-tag';
  if (path.startsWith('/blog/')) {
    if (segments.length === 2 && /^\d+$/.test(segments[1])) {
      return 'blog';
    }
    return 'blog-post';
  }

  return path === '/blog' ? 'blog' : 'page';
};

export const getPageTitle = (metadata?: MetaData) => metadata?.title || SITE_NAME;

export const getPageDescription = (metadata?: MetaData) => metadata?.description || DEFAULT_SITE_DESCRIPTION;

export const getKeywordList = (keywords?: string) =>
  (keywords || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);

export const getAbsoluteUrl = (pathname: string, site?: URL | string) => new URL(pathname, getSiteOrigin(site)).toString();

export const getPageName = (pathname: string, metadata?: MetaData) => {
  const kind = getPageKind(pathname);
  const title = getPageTitle(metadata);

  if (kind === 'home') return SITE_NAME;
  if (metadata?.title) return metadata.title;
  if (kind === 'pricing') return 'Pricing';
  if (kind === 'support') return 'Support';
  if (kind === 'team') return 'About RustDesk';
  if (kind === 'open-source') return 'Open Source';
  if (kind === 'blog') return 'Blog';
  if (kind === 'privacy') return 'Privacy Policy';
  if (kind === 'terms') return 'Terms and Conditions';
  if (kind === 'success') return 'Payment Success';
  if (kind === 'cancel') return 'Payment Cancelled';
  if (kind === 'blog-post') return title;

  return title;
};

export const shouldIndexUtilityPage = (pathname: string) => {
  const kind = getPageKind(pathname);
  return !['success', 'cancel', 'utility'].includes(kind);
};

export const AI_CRAWLER_POLICIES = [
  { name: 'GPTBot', allow: '/' },
  { name: 'ChatGPT-User', allow: '/' },
  { name: 'PerplexityBot', allow: '/' },
  { name: 'ClaudeBot', allow: '/' },
  { name: 'anthropic-ai', allow: '/' },
  { name: 'Google-Extended', allow: '/' },
  { name: 'Bingbot', allow: '/' },
];

export const getImportantSiteLinks = () => [
  { label: 'Homepage', url: `${SITE_URL}/` },
  { label: 'Official technical FAQ (GitHub Wiki)', url: TECHNICAL_FAQ_URL },
  { label: 'Pricing', url: `${SITE_URL}/pricing` },
  { label: 'Support', url: `${SITE_URL}/support` },
  { label: 'Open Source', url: `${SITE_URL}/open-source` },
  { label: 'About RustDesk', url: `${SITE_URL}/team` },
  { label: 'Blog', url: `${SITE_URL}/blog` },
  { label: 'Documentation', url: `${SITE_URL}/docs/en/` },
  { label: 'Server Pro docs', url: `${SITE_URL}/docs/en/self-host/rustdesk-server-pro/` },
  { label: 'Open source self-host docs', url: `${SITE_URL}/docs/en/self-host/rustdesk-server-oss/` },
];

export const hasLocalizedPageKind = (kind: string) =>
  localizedPageKinds.includes(kind as (typeof localizedPageKinds)[number]);
