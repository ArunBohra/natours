import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type LangCode, getPageLang } from '../../helpers/languages';

export interface LanguageState {
  currentLang: LangCode;
}

const initialState: LanguageState = {
  currentLang: getPageLang(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LangCode>) => {
      state.currentLang = action.payload;
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
