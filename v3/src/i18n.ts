import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./locales";
import { getRelativeLocaleUrl } from "astro:i18n";


/**
 * User-defined locales list
 * @constant @readonly
 */
export const LOCALES = LOCALES_SETTING as Record<string, LocaleConfig>;
type LocaleConfig = {
  readonly label: string;
  readonly lang?: string;
  readonly dir?: "ltr" | "rtl";
};


/**
 * Type for the language code
 * @example
 * "en" | "ja" | ...
 */
export type Lang = keyof typeof LOCALES;


/**
 * Default locale code
 * @constant @readonly
*/
export const DEFAULT_LOCALE = DEFAULT_LOCALE_SETTING as Lang;


/**
 * Type for the multilingual object
 * @example
 * { en: "Hello", ja: "こんにちは", ... }
 */
export type Multilingual = { [key in Lang]?: string };


/**
 * Helper to get the translation function
 * @param - The current language
 * @returns - The translation function
 */
export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual | string): string {
    if (typeof multilingual === "string") {
      return multilingual;
    } else {
      return multilingual[lang] || multilingual[DEFAULT_LOCALE] || "";
    }
  };
}


/**
 * Helper to get corresponding path list for all locales
 * @param url - The current URL object
 * @returns - The list of locale paths
 */
export function getLocalePaths(url: URL): LocalePath[] {
  const path = url.pathname.replace(/^\/([a-zA-Z-]+)(?=\/|$)/, (match, p1) => {
    return LOCALES[p1] ? '' : match;
  });
  return Object.keys(LOCALES).map((lang) => {
    return {
      lang: lang as Lang,
      path: getRelativeLocaleUrl(lang, path)
    };
  });
}
type LocalePath = {
  lang: Lang;
  path: string;
};


/**
 * Helper to get locale parms for Astro's `getStaticPaths` function
 * @returns - The list of locale params
 * @see https://docs.astro.build/en/guides/routing/#dynamic-routes
 */
export const localeParams = Object.keys(LOCALES).map((lang) => ({
  params: { lang },
}));

export const getLocalPath = (lang: Lang, path: string) => {
  if (!lang || lang === DEFAULT_LOCALE) {
    return path + '?lang=en';
  }
  return lang + path;
}
