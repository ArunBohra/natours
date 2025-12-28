const Languages = ['EN', 'HI', 'AR'] as const;

export const languageCodes = {
  EN: 'English',
  HI: 'Hindi',
  AR: 'Arabic',
};

export type LangCode = keyof typeof languageCodes;

export default Languages;
