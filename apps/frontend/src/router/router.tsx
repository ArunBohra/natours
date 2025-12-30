import { createBrowserRouter } from 'react-router';

import App from '../App';
import { getNewLangUrl, getPageLang, isLanguageAvailable } from '../helpers/languages';
import LoginPage from '../pages/auth/login/login.page';
import SignupPage from '../pages/auth/signup/signup.page';

export const router = createBrowserRouter([
  {
    path: '/:lang',
    loader: ({ params }: { params: { lang?: string } }) => {
      const lang = params.lang;
      if (!lang || !isLanguageAvailable(lang)) {
        window.location.replace(getNewLangUrl(getPageLang()));
      }

      return null;
    },
    Component: App,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'signup',
        Component: SignupPage,
      },
    ],
  },
]);
