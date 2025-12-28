import type { LangCode } from '../../constants/languages';
import Languages from '../../constants/languages';

export const getInitialLang = (): LangCode => {
  const lang = localStorage.getItem('language') as LangCode | null;
  if (!lang || !Languages.includes(lang)) return Languages[0];
  return lang;
};
