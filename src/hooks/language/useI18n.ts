import i18next from 'i18next';
import { I18nManager } from 'react-native';
import { MMKV } from 'react-native-mmkv';

import RNRestart from 'react-native-restart';

import { SupportedLanguages } from './schema';

const LANGUAGE_KEY = 'app_language';
const storage = new MMKV();

const changeLanguage = (lang: SupportedLanguages) => {
  void i18next.changeLanguage(lang);
  storage.set(LANGUAGE_KEY, lang); // Persist language

  const isRTL = lang === 'ar-AR';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
    setTimeout(() => {
      RNRestart.restart();
    }, 50);
  }
};

const toggleLanguage = () => {
  const languageCycle = [
    SupportedLanguages.EN_EN,
    SupportedLanguages.FR_FR,
    SupportedLanguages.AR_AR,
  ];
  const currentIndex = languageCycle.findIndex(
    (lang) => lang === (i18next.language as string),
  );
  const nextIndex = (currentIndex + 1) % languageCycle.length;
  changeLanguage(languageCycle[nextIndex]);
};

export const useI18n = () => {
  return { changeLanguage, toggleLanguage };
};
