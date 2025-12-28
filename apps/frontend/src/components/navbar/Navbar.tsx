import React from 'react';

import AfterLoginNavbar from './AfterLoginNavbar';
import BeforeLoginNavbar from './BeforeLoginNavbar';

interface User {
  image: string;
  name: string;
  email: string;
}

interface NavbarProps {
  isLoggedIn: boolean;
  user?: User;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="fixed top-0 left-0 flex w-full items-center justify-between bg-gray-200 px-12 py-5 dark:bg-gray-800">
      <img src="../../../assets/img/logos/logo-white.webp" alt="Natours" className="w-20" />

      {!isLoggedIn ? <BeforeLoginNavbar /> : <AfterLoginNavbar />}
    </nav>
  );
};

export default Navbar;
