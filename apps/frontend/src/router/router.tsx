import { createBrowserRouter } from 'react-router';

import App from '../App';
import LoginPage from '../pages/auth/login/login.page';
import SignupPage from '../pages/auth/signup/signup.page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/login',
        Component: LoginPage,
      },
      {
        path: '/signup',
        Component: SignupPage,
      },
    ],
  },
]);
