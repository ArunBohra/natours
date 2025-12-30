const Languages = ['en', 'hi', 'ar'] as const;

export const defaultLang = Languages[0];

export const languageCodes = {
  en: 'english',
  hi: 'hindi',
  ar: 'arabic',
};

export type LangCode = keyof typeof languageCodes;

export const RtlLanguages: LangCode[] = ['ar'] as const;

export const isLanguageAvailable = (lang: string) => {
  return Languages.includes(lang as LangCode);
};

export const getPageLang = (): LangCode => {
  const lang = window.location.pathname.split('/')[1] as LangCode;
  if (!isLanguageAvailable(lang)) return defaultLang;
  return lang;
};

export const getNewLangUrl = (lang: LangCode): string => {
  const pathParts = window.location.pathname.split('/');
  pathParts[1] = lang;
  return pathParts.join('/');
};

export const updatePageDir = (lang: LangCode) => {
  const isRtl = RtlLanguages.includes(lang);
  const htmlElement = window.document.documentElement;
  htmlElement.dir = isRtl ? 'rtl' : 'ltr';
};

export const updatePageLang = (lang: LangCode) => {
  const htmlElement = window.document.documentElement;
  htmlElement.lang = lang;
};

export default Languages;
