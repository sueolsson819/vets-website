import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './glossary/en.json';
import es from './glossary/es.json';
import tl from './glossary/tl.json';

const resources = {
  en: {
    glossary: en,
  },
  es: {
    glossary: es,
  },
  tl: {
    glossary: tl,
  },
};

export const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      defaultNS: 'glossary',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    });
  return i18n;
};

export default i18n;
