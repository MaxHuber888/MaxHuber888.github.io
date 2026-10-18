import { writable } from 'svelte/store';

const THEME_KEY = 'theme';

function getInitialTheme(): 'light' | 'dark' {
	if (typeof window === 'undefined') return 'light';
	const stored = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
	if (stored) return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const theme = writable<'light' | 'dark'>(getInitialTheme());

theme.subscribe((value) => {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', value === 'dark');
	localStorage.setItem(THEME_KEY, value);
});

export function toggleTheme() {
	theme.update((current) => (current === 'light' ? 'dark' : 'light'));
}
