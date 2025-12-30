import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { defaultLang, getPageLang } from '../helpers/languages';

const loadPath = (lng: string) => `../../assets/lang/${lng}.json`;

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: defaultLang,
    lng: getPageLang(),
    debug: import.meta.env.DEV ? true : false,
    load: 'languageOnly',
    backend: {
      loadPath: loadPath,
    },
    react: {
      useSuspense: true,
    },
  })
  .catch((err: unknown) => {
    console.log(err);
  });

export default i18n;
