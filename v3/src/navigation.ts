import { getPermalink, getAsset } from './utils/permalinks';
import { useTranslations, getLocalPath, type Lang } from '@/i18n';

export const headerData = (locale?: Lang) => {
  const t = useTranslations(locale || '');
  return {
    links: [
      {
        text: t({
          en: 'Resources',
          de: 'Ressourcen',
          es: 'Recursos',
          fr: 'Ressources',
          it: 'Risorse',
          ja: 'リソース',
          pt: 'Recursos',
          'zh-cn': '资源',
          'zh-tw': '資源',
        }),
        links: [
          {
            text: t({
              en: 'About us',
              de: 'Über uns',
              es: 'Sobre nosotros',
              fr: 'À propos de nous',
              it: 'Chi siamo',
              ja: '私たちについて',
              pt: 'Sobre nós',
              'zh-cn': '关于我们',
              'zh-tw': '關於我們',
            }),
            href: getPermalink(getLocalPath(locale || '', '/team')),
          },
          {
            text: t({
              en: 'Support',
              de: 'Support',
              es: 'Soporte',
              fr: 'Support',
              it: 'Supporto',
              ja: 'サポート',
              pt: 'Suporte',
              'zh-cn': '支持',
              'zh-tw': '支持',
            }),
            href: getPermalink(getLocalPath(locale || '', '/support')),
          },
          {
            text: t({
              en: 'Web Client',
              de: 'Web-Client',
              es: 'Cliente web',
              fr: 'Client Web',
              it: 'Client Web',
              ja: 'Webクライアント',
              pt: 'Cliente Web',
              'zh-cn': 'Web客户端',
              'zh-tw': 'Web客戶端',
            }),
            href: getPermalink('/web'),
          },
          {
            text: t({
              en: 'Pro License Portal',
              de: 'Pro-Lizenzportal',
              es: 'Portal de licencias Pro',
              fr: 'Portail de licence Pro',
              it: 'Portale delle licenze Pro',
              ja: 'Proライセンスポータル',
              pt: 'Portal de licença Pro',
              'zh-cn': '专业许可证门户',
              'zh-tw': '專業許可證門戶',
            }),
            href: getPermalink('/self-host/account'),
          },
          {
            text: 'FAQ',
            href: 'https://github.com/rustdesk/rustdesk/wiki/FAQ',
          },
        ],
      },
      {
        text: t({
          en: 'Pricing',
          de: 'Preise',
          es: 'Precios',
          fr: 'Tarification',
          it: 'Prezzi',
          ja: '料金',
          pt: 'Preços',
          'zh-cn': '定价',
          'zh-tw': '定價',
        }),
        href: getPermalink(getLocalPath(locale || '', '/pricing')),
      },
      {
        text: t({
          en: 'Docs',
          de: 'Dokumentation',
          es: 'Documentación',
          fr: 'Documentation',
          it: 'Documentazione',
          ja: 'ドキュメント',
          pt: 'Documentação',
          'zh-cn': '文档',
          'zh-tw': '文件',
        }),
        href: getPermalink('/docs'),
      },
      {
        text: t({
          en: 'Blog',
          ja: 'ブログ',
          'zh-cn': '博客',
          'zh-tw': '博客',
        }),
        href: getPermalink('/blog'),
      },
    ],
    actions: [{
      text: t({
        en: 'Download',
        de: 'Herunterladen',
        es: 'Descargar',
        fr: 'Télécharger',
        it: 'Scaricare',
        ja: 'ダウンロード',
        pt: 'Baixar',
        'zh-cn': '下载',
        'zh-tw': '下載',
      })
      , href: 'https://github.com/rustdesk/rustdesk/releases/latest', target: '_blank'
    }],
  }
    ;
}

export const footerData = (locale?: Lang) => {
  const t = useTranslations(locale || '');
  return {
    links: [
      { title: headerData(locale).links[0].text, links: headerData(locale).links[0].links },
      {
        title: t({
          en: 'Community',
          de: 'Gemeinschaft',
          es: 'Comunidad',
          fr: 'Communauté',
          it: 'Comunità',
          ja: 'コミュニティ',
          pt: 'Comunidade',
          'zh-cn': '社区',
          'zh-tw': '社區',
        }),
        links: [
          { text: 'X', href: 'https://twitter.com/rustdesk' },
          { text: 'Discord', href: 'https://discord.com/invite/nDceKgxnkV' },
          { text: 'Reddit', href: 'https://www.reddit.com/r/rustdesk/' },
          { text: 'GitHub', href: 'https://github.com/rustdesk/rustdesk' },
        ],
      },
      {
        title: t({
          en: 'Download',
          de: 'Herunterladen',
          es: 'Descargar',
          fr: 'Télécharger',
          it: 'Scaricare',
          ja: 'ダウンロード',
          pt: 'Baixar',
          'zh-cn': '下载',
          'zh-tw': '下載',
        }),
        links: [
          {
            text: t({
              en: 'RustDesk Client',
              de: 'RustDesk-Client',
              es: 'Cliente de RustDesk',
              fr: 'Client RustDesk',
              it: 'Client RustDesk',
              ja: 'RustDeskクライアント',
              pt: 'Cliente RustDesk',
              'zh-cn': 'RustDesk客户端',
              'zh-tw': 'RustDesk客戶端',
            })
            , href: 'https://github.com/rustdesk/rustdesk/releases/latest'
          },
          { text: 'RustDesk Server OSS', href: 'https://github.com/rustdesk/rustdesk-server/releases/latest' },
          { text: 'RustDesk Server Pro', href: 'https://github.com/rustdesk/rustdesk-server-pro/releases/latest' },
        ],
      },
    ],
    secondaryLinks: [
      {
        text: t({
          en: 'Terms',
          de: 'Bedingungen',
          es: 'Términos',
          fr: 'Termes',
          it: 'Termini',
          ja: '利用規約',
          pt: 'Termos',
          'zh-cn': '条款',
          'zh-tw': '條款',
        })
        , href: getPermalink('/terms')
      },
      {
        text: t({
          en: 'Privacy Policy',
          de: 'Datenschutz-Bestimmungen',
          es: 'Política de privacidad',
          fr: 'Politique de confidentialité',
          it: 'Informativa sulla privacy',
          ja: 'プライバシーポリシー',
          pt: 'Política de Privacidade',
          'zh-cn': '隐私政策',
          'zh-tw': '隱私政策',
        })
        , href: getPermalink('/privacy')
      },
    ],
    socialLinks: [
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/rustdesk' },
      { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.com/invite/nDceKgxnkV' },
      { ariaLabel: 'Reddit', icon: 'tabler:brand-reddit', href: 'https://www.reddit.com/r/rustdesk/' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/rustdesk/rustdesk' },
    ],
    footNote: '© 2024 Purslane',
  };
}
