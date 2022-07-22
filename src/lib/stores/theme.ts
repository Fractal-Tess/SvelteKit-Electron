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

// store.get('theme').then(storedTheme => {
// 	if (!storedTheme) {
// 		store.set('theme', 'dark');
// 		theme.set('dark');
// 	} else {
// 		theme.set(storedTheme as Theme);
// 	}
// });

// export const switchTheme = () => {
// 	theme.update(currentTheme => {
// 		const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
// 		store.set('theme', nextTheme);
// 		return nextTheme;
// 	});
// };

// store
// 	.get('theme')
// 	.then(async theme => console.log('Current theme: ', await theme));
