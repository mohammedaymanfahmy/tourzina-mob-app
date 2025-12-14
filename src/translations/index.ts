import 'intl-pluralrules';

import type { Language } from '@/hooks/language/schema';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';

import en from './en-EN.json';
import fr from './fr-FR.json';
import ar from './ar-AR.json';

export const defaultNS = 'tourzinamobapp';

export const resources = {
  'en-EN': en,
  'fr-FR': fr,
  'ar-AR': ar,
} as const satisfies Record<Language, unknown>;

// Create storage instance directly
const storage = new MMKV();
const LANGUAGE_KEY = 'app_language';
const savedLanguage = storage.getString(LANGUAGE_KEY) as Language | undefined;

void i18n.use(initReactI18next).init({
  defaultNS,
  fallbackLng: 'fr-FR',
  lng: savedLanguage || 'fr-FR', // Use saved language if available
  resources,
});

// add capitalization formatter
i18n.services.formatter?.add(
  'capitalize',
  (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
);

export { default } from 'i18next';
