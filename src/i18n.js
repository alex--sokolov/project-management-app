import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../src/data/i18n/translationEN.json';
import translationRU from '../src/data/i18n/translationRU.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
