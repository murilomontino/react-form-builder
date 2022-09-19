import enLang from './entries/en-us';
import vnLang from './entries/vi-vn';
import ptLang from './entries/pt-br';

export const AppLanguages = [
  {
    languageId: 'vietnamese',
    locale: 'vi',
    name: 'Vietnamese',
    icon: 'vn',
  },
  {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  {
    languageId: 'portuguese',
    locale: 'pt',
    name: 'Portuguese',
    icon: 'pt',
  },
];

const AppLocale = {
  en: enLang,
  vi: vnLang,
  pt: ptLang,
};

export default AppLocale;
