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
          ar: 'موارد',
          ko: '자원',
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
              ar: 'من نحن',
              ko: '우리에 대해',
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
              ar: 'الدعم',
              ko: '지원',
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
              ja: 'Web クライアント',
              pt: 'Cliente Web',
              'zh-cn': 'Web 客户端',
              'zh-tw': 'Web 客戶端',
              ar: 'عميل الويب',
              ko: '웹 클라이언트',
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
              ar: 'بوابة ترخيص Pro',
              ko: 'Pro 라이선스 포털',
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
          ar: 'التسعير',
          ko: '가격',
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
          ar: 'وثائق',
          ko: '문서',
        }),
        href: getPermalink('/docs'),
      },
      {
        text: t({
          en: 'Blog',
          ja: 'ブログ',
          'zh-cn': '博客',
          'zh-tw': '博客',
          ar: 'مدونة',
          ko: '블로그',
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
        ar: 'تحميل',
        ko: '다운로드',
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
          ar: 'مجتمع',
          ko: '커뮤니티',
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
          ar: 'تحميل',
          kernel: '다운로드',
        }),
        links: [
          {
            text: t({
              en: 'RustDesk Client',
              de: 'RustDesk-Client',
              es: 'Cliente de RustDesk',
              fr: 'Client RustDesk',
              it: 'Client RustDesk',
              ja: 'RustDesk クライアント',
              pt: 'Cliente RustDesk',
              'zh-cn': 'RustDesk 客户端',
              'zh-tw': 'RustDesk 客戶端',
              ar: 'عميل RustDesk',
              ko: 'RustDesk 클라이언트',
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
          ar: 'شروط',
          ko: '약관',
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
          ar: 'سياسة الخصوصية',
          ko: '개인정보 처리방침',
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
