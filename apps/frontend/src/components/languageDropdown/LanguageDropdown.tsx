import { useState } from 'react';
import { useNavigate } from 'react-router';

import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import Languages, { type LangCode, getNewLangUrl } from '../../helpers/languages';
import { useAppSelector } from '../../redux/store';
import Dropdown from '../dropdown/Dropdown';
import LanguageItem from './LanguageItem';

const LanguageDropdown = () => {
  const currentLang = useAppSelector((state) => state.language.currentLang);
  const navigate = useNavigate();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const langDropdownItems = Languages.map((lang) => ({ element: <LanguageItem lang={lang} key={lang} />, lang })).map(
    (item) => ({
      element: item.element,
      value: item.lang,
      isSelected: item.lang === currentLang,
    }),
  );

  const updateLanguage = (langCode: LangCode) => {
    const newPath = getNewLangUrl(langCode);
    toggleLangDropdown();
    void navigate(newPath);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen((isOpen) => !isOpen);
  };

  return (
    <div className="relative">
      <button className="flex cursor-pointer items-center" onClick={toggleLangDropdown}>
        <LanguageItem lang={currentLang} />
        <ChevronDown className={`${isLangDropdownOpen ? 'rotate-180' : ''} transition-[rotate_.3s]`} />
      </button>

      <div className="absolute top-10 right-0">
        <Dropdown
          isOpen={isLangDropdownOpen}
          dropdownItems={langDropdownItems}
          selectActionFn={updateLanguage}
          closeFn={toggleLangDropdown}
        />
      </div>
    </div>
  );
};

export default LanguageDropdown;
