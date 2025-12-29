import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import LanguageDropdown from '../languageDropdown/LanguageDropdown';

const BeforeLoginNavbar: React.FC = () => {
  const { t } = useTranslation();

  const navbarLinks = [
    {
      text: t('login'),
      to: '/login',
    },
    {
      text: t('signup'),
      to: '/signup',
    },
  ];

  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-5">
        {navbarLinks.map((link) => (
          <Link to={link.to} className="link" key={link.to}>
            {link.text}
          </Link>
        ))}
      </div>

      <LanguageDropdown />
    </div>
  );
};

export default BeforeLoginNavbar;
