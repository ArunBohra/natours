import { useTranslation } from 'react-i18next';

import { type LangCode, languageCodes } from '../../helpers/languages';

interface LanguageItemProps {
  lang: LangCode;
}

const LanguageItem = ({ lang }: LanguageItemProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center disabled:bg-gray-700">
      <img
        src={`../../../assets/img/flags/${lang.toLowerCase()}.png`}
        alt={t(languageCodes[lang])}
        className="me-2 h-5 w-5"
      />
      <span className="dark:text-white">{t(languageCodes[lang])}</span>
    </div>
  );
};

export default LanguageItem;
