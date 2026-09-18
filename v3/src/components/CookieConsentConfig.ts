import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import en from './cookie/en.json';
import de from './cookie/de.json';
import es from './cookie/es.json';
import fr from './cookie/fr.json';
import pt from './cookie/pt.json';
import it from './cookie/it.json';
import ja from './cookie/ja.json';
import ar from './cookie/ar.json';
import ko from './cookie/ko.json';
import zhCN from './cookie/zh-CN.json';
import zhTW from './cookie/zh-TW.json';
import az from './cookie/az.json';

declare global {
  interface Window {
    loadGoogleAnalytics?: () => void;
    disableGoogleAnalytics?: () => void;
  }
}

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  onConsent: () => {
    localStorage.setItem('cookie-accepted', 'true');
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      // reloadPage fires only when this category goes from accepted to rejected, so
      // withdrawing consent reloads into a page where the stored rejection means gtag
      // is never loaded at all. That is what makes withdrawal deterministic rather than
      // dependent on switching off a tag that is already running.
      autoClear: {
        cookies: [{ name: /^_ga/ }],
        reloadPage: true,
      },
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          // Defined by Analytics.astro, which only declares the loader and never calls
          // it, so Google is contacted for the first time here -- after consent.
          onAccept: () => {
            window.loadGoogleAnalytics?.();
          },
          // Rejecting is not only a first refusal: the visitor may have accepted
          // earlier, in which case gtag is already running and keeps sending (and
          // re-setting _ga) unless it is switched off explicitly.
          onReject: () => {
            window.disableGoogleAnalytics?.();
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'document',
    translations: {
      en, de, es, fr, ja, pt, it, 'zh-CN': zhCN, 'zh-TW': zhTW, ar, ko, az,
    },
  },
};
