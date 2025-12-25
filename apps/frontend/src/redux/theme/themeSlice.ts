import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { store } from '../store';
import type { AppDispatch } from '../store';
import { getInitialTheme, updateBodyClass } from './helpers';

export interface ThemeState {
  mode: 'light' | 'dark';
}
const initialState: ThemeState = getInitialTheme();
updateBodyClass(initialState.mode);

const broadcast = new BroadcastChannel('theme');

broadcast.onmessage = ({ data }: MessageEvent<{ type: string; payload: ThemeState['mode'] }>) => {
  if (data.type === 'theme-change' && data.payload !== store.getState().theme.mode) {
    store.dispatch(setTheme(data.payload));
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      updateBodyClass(state.mode);
      localStorage.setItem('theme', state.mode);
      broadcast.postMessage({ type: 'theme-change', payload: state.mode });
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const toggleTheme = () => (dispatch: AppDispatch, getState: () => { theme: ThemeState }) => {
  const newMode = getState().theme.mode === 'light' ? 'dark' : 'light';
  dispatch(setTheme(newMode));
};

export default themeSlice.reducer;
