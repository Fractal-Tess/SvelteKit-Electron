import type { Theme } from '$types';
import { writable } from 'svelte/store';

const themes = ['light', 'dark'] as const;

export const isTheme = (theme: string): theme is Theme =>
  themes.includes(theme as Theme);

const createThemeStore = () => {
  const { subscribe, update } = writable(api.theme.get());

  subscribe(theme => {
    api.theme.set(theme);
  });

  return {
    subscribe,
    toggleTheme: () => {
      update(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
    }
  };
};
export const theme = createThemeStore();
