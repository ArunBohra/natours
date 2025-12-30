import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';

import Navbar from './components/navbar/Navbar';
import type { LangCode } from './helpers/languages';
import { isLanguageAvailable, updatePageDir, updatePageLang } from './helpers/languages';
import i18n from './i18n/i18n';
import { changeLanguage } from './redux/language/languageSlice';
import { useAppDispatch } from './redux/store';
import { toggleTheme } from './redux/theme/themeSlice';

const App = () => {
  const { lang } = useParams<{ lang: LangCode }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lang && lang !== i18n.language && isLanguageAvailable(lang)) {
      void i18n.changeLanguage(lang);
      dispatch(changeLanguage(lang));
    }
  }, [lang, dispatch]);

  useEffect(() => {
    if (lang) {
      updatePageLang(lang);
      updatePageDir(lang);
    }
  }, [lang]);

  const isLoggedIn = !Math.random() ? false : true; // Replace with actual authentication logic
  // const user = {
  //   avatar: '/dummy-avatar.png',
  //   name: 'Arun',
  //   email: 'arunbohra@gmail.com',
  // }; // Replace with actual user data

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div
        onClick={() => {
          dispatch(toggleTheme());
        }}
        className="relative z-10"
      >
        toggle theme
      </div>
      <Outlet />
    </>
  );
};

export default App;
