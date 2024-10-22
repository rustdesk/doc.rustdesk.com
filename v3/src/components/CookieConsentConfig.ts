import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import en from './cookie/en.json';
import de from './cookie/de.json';
import es from './cookie/es.json';
import fr from './cookie/fr.json';
import pt from './cookie/pt.json';
import it from './cookie/pt.json';
import ja from './cookie/pt.json';
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
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4 (dummy)</a>',
          onAccept: () => {
            // TODO: load ga4
            localStorage.setItem('cookie-accepted', 'true');
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
        another: {
          label: 'Another one (dummy)',
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en, de, es, fr, ja, pt, it, 'zh-CN': zhCN, 'zh-TW': zhTW,
    },
  },
};
