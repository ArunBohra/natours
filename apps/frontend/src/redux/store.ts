import { configureStore } from '@reduxjs/toolkit';

import themeReducer, { type ThemeState } from './theme/themeSlice';

export interface RootState {
  theme: ThemeState;
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  devTools: true,
});
