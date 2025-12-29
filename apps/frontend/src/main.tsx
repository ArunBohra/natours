import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import i18n from './i18n/i18n.ts';
import './index.css';
import { store } from './redux/store.ts';
import { router } from './router/router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </I18nextProvider>
    </Suspense>
  </StrictMode>,
);
