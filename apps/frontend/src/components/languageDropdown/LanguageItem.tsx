import { type LangCode, languageCodes } from '../../constants/languages';

interface LanguageItemProps {
  lang: LangCode;
}

const LanguageItem = ({ lang }: LanguageItemProps) => {
  return (
    <div className="flex items-center disabled:bg-gray-700">
      <img src={`../../../assets/img/flags/${lang.toLowerCase()}.png`} alt="English" className="me-2 h-5 w-5" />
      <span className="dark:text-white">{languageCodes[lang]}</span>
    </div>
  );
};

export default LanguageItem;
