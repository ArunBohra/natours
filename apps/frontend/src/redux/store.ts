import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import languageReducer, { type LanguageState } from './language/languageSlice';
import themeReducer, { type ThemeState } from './theme/themeSlice';

export interface RootState {
  theme: ThemeState;
  language: LanguageState;
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
  devTools: true,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch.withTypes<AppDispatch>();
