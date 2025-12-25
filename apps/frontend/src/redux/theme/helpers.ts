import type { ThemeState } from './themeSlice';

export const updateBodyClass = (mode: ThemeState['mode']) => {
  document.body.classList.toggle('dark', mode === 'dark');
};

export const getInitialTheme = (): ThemeState => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return { mode: storedTheme };
  }

  return { mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' };
};
