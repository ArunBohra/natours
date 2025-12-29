const Languages = ['en', 'hi', 'ar'] as const;

export const languageCodes = {
  en: 'english',
  hi: 'hindi',
  ar: 'arabic',
};

export type LangCode = keyof typeof languageCodes;

export default Languages;
