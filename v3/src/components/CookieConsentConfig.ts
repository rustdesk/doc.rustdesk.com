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
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            // TODO: load ga4
          },
          onReject: () => {
            console.log('ga4 rejected');
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
      en, de, es, fr, ja, pt, it, 'zh-CN': zhCN, 'zh-TW': zhTW, ar, ko,
    },
  },
};
