import { Link } from 'react-router';

import LanguageDropdown from '../languageDropdown/LanguageDropdown';

const navbarLinks = [
  {
    text: 'Login',
    to: '/login',
  },
  {
    text: 'Signup',
    to: '/signup',
  },
];

const BeforeLoginNavbar: React.FC = () => {
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
