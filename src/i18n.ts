import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../src/data/i18n/translationEN.json';
import translationRU from '../src/data/i18n/translationRU.json';
import { LocalStorageService } from '@/services/localStorage';

export const lang = LocalStorageService.getLang() || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ru: {
      translation: translationRU,
    },
  },
  lng: lang,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage'],
    caches: ['localStorage'],
  },
});

export default i18n;
