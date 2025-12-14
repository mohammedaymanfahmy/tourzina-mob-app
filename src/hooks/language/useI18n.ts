import i18next from 'i18next';
import { I18nManager } from 'react-native';

import { SupportedLanguages } from './schema';

const changeLanguage = (lang: SupportedLanguages) => {
  void i18next.changeLanguage(lang);
  const isRTL = lang === 'ar-AR';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
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
