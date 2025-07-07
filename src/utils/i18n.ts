import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
const { supportedLocales } = require('./supportedLocales.ts');

const NAMESPACE = 'search-ui-react';
const resources: Record<string, any> = {};

supportedLocales.forEach(locale => {
  resources[locale] = {
    [NAMESPACE]: require(`../../locales/${locale}/search-ui-react.json`),
  };
});

/**
 * A custom i18next instance with React integration for search-ui-react.
 *
 * @internal
 */
const i18nInstance = i18next.createInstance();
i18nInstance.use(initReactI18next).init({
  fallbackLng: 'en',
  ns: [NAMESPACE],
  defaultNS: NAMESPACE,
  interpolation: { escapeValue: false },
  resources
});

export { i18nInstance };
