// locale settings for this theme
// https://astro-i18n-starter.pages.dev/setup/

export const DEFAULT_LOCALE_SETTING: string = 'en';

export const LOCALES_SETTING: LocaleSetting = {
  en: {
    label: 'English',
    openGraphLocale: 'en_US',
  },
  de: {
    label: 'Deutsch',
    openGraphLocale: 'de_DE',
  },
  es: {
    label: 'Español',
    openGraphLocale: 'es_ES',
  },
  fr: {
    label: 'Français',
    openGraphLocale: 'fr_FR',
  },
  it: {
    label: 'Italiano',
    openGraphLocale: 'it_IT',
  },
  ja: {
    label: '日本語',
    openGraphLocale: 'ja_JP',
  },
  ko: {
    label: '한국어',
    openGraphLocale: 'ko_KR',
  },
  pt: {
    label: 'Português',
    openGraphLocale: 'pt_BR',
  },
  'zh-cn': {
    label: '简体中文',
    lang: 'zh-CN',
    openGraphLocale: 'zh_CN',
  },
  'zh-tw': {
    label: '繁體中文',
    lang: 'zh-TW',
    openGraphLocale: 'zh_TW',
  },
  ar: {
    label: 'العربية',
    openGraphLocale: 'ar_SA',
    dir: 'rtl',
  },
};

interface LocaleSetting {
  [key: Lowercase<string>]: {
    label: string;
    lang?: string;
    openGraphLocale?: string;
    dir?: 'rtl' | 'ltr';
  };
} // refer: https://starlight.astro.build/reference/configuration/#locales
