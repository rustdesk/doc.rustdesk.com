
// locale settings for this theme
// https://astro-i18n-starter.pages.dev/setup/

export const DEFAULT_LOCALE_SETTING: string = "en";

export const LOCALES_SETTING: LocaleSetting = {
  "en": {
    "label": "English"
  },
  "de": {
    "label": "Deutsch"
  },
  "es": {
    "label": "Español"
  },
  "fr": {
    "label": "Français"
  },
  "it": {
    "label": "Italiano"
  },
  "ja": {
    "label": "日本語"
  },
  "pt": {
    "label": "Português"
  },
  "zh-cn": {
    "label": "简体中文",
    "lang": "zh-CN"
  },
  "zh-tw": {
    "label": "繁體中文",
    "lang": "zh-TW"
  },
  /*
  "ar": {
    "label": "العربية",
    "dir": "rtl"
  },
  */
};

interface LocaleSetting {
  [key: Lowercase<string>]: {
    label: string;
    lang?: string;
    dir?: 'rtl' | 'ltr';
  };
} // refer: https://starlight.astro.build/reference/configuration/#locales
