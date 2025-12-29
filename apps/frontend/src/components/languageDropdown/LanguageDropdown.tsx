import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import Languages, { type LangCode } from '../../constants/languages';
import { changeLanguage } from '../../redux/language/languageSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Dropdown from '../dropdown/Dropdown';
import LanguageItem from './LanguageItem';

const availableLanguages = Languages;

const LanguageDropdown = () => {
  const currentLang = useAppSelector((state) => state.language.currentLang);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const langDropdownItems = availableLanguages
    .map((lang) => ({ element: <LanguageItem lang={lang} key={lang} />, lang }))
    .map((item) => ({
      element: item.element,
      value: item.lang,
      isSelected: item.lang === currentLang,
    }));

  const updateLanguage = (langCode: LangCode) => {
    dispatch(changeLanguage(langCode));
    toggleLangDropdown();
    void (async () => {
      await i18n.changeLanguage(langCode);
    })();
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
