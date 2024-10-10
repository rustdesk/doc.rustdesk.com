import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Resources',
      links: [
        {
          text: 'About us',
          href: getPermalink('/about'),
        },
        {
          text: 'Support',
          href: getPermalink('/support'),
        },
        {
          text: 'Web Client',
          href: getPermalink('/web'),
        },
        {
          text: 'Pro License Portal',
          href: getPermalink('/self-host/account'),
        },
        {
          text: 'FAQ',
          href: 'https://github.com/rustdesk/rustdesk/wiki/FAQ',
        },
      ],
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Docs',
      href: getPermalink('/docs'),
    },
    {
      text: 'Blog',
      href: getPermalink('/blog'),
    },
  ],
  actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    { title: 'Resources', links: headerData.links[0].links },
    {
      title: 'Community',
      links: [
        { text: 'X', href: 'https://twitter.com/rustdesk' },
        { text: 'Discord', href: 'https://discord.com/invite/nDceKgxnkV' },
        { text: 'Reddit', href: 'https://www.reddit.com/r/rustdesk/' },
        { text: 'GitHub', href: 'https://github.com/rustdesk/rustdesk' },
      ],
    },
    {
      title: 'Download',
      links: [
        { text: 'RustDesk Client', href: 'https://github.com/rustdesk/rustdesk/releases/latest' },
        { text: 'RustDesk Server OSS', href: 'https://github.com/rustdesk/rustdesk-server/releases/latest' },
        { text: 'RustDesk Server Pro', href: 'https://github.com/rustdesk/rustdesk-server-pro/releases/latest' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/rustdesk' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.com/invite/nDceKgxnkV' },
    { ariaLabel: 'Reddit', icon: 'tabler:brand-reddit', href: 'https://www.reddit.com/r/rustdesk/' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/rustdesk/rustdesk' },
  ],
  footNote: `
    © 2024 Purslane Ltd. All rights reserved.
  `,
};
