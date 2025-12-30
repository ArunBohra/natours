import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import LanguageDropdown from '../languageDropdown/LanguageDropdown';

const AfterLoginNavbar = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  const navbarLinks = [
    {
      text: t('all_tours'),
      to: '/tours',
    },
    {
      text: t('upcoming_tours'),
      to: '/upcoming-tours',
    },
  ];

  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-5">
        {navbarLinks.map((link) => (
          <Link to={`${lang!}/${link.to}`} className="link" key={link.to}>
            {link.text}
          </Link>
        ))}
      </div>

      <LanguageDropdown />
    </div>
  );
};

export default AfterLoginNavbar;
