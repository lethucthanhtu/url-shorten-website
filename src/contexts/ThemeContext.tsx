/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

export type Theme = 'dark' | 'light' | 'system';
export const themeKey = 'vite-ui-theme';

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	currentTheme: Theme;
};

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
	currentTheme: 'system',
};

export const ThemeProviderContext =
	createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = themeKey,
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme
	);

	const [currentTheme, setCurrentTheme] = useState<Theme>(
		window.document.documentElement.classList[1] as Theme
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light';

			root.classList.add(systemTheme);
			setCurrentTheme(systemTheme);
			return;
		}

		root.classList.add(theme);

		setCurrentTheme(root.classList[1] as Theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
		currentTheme: currentTheme,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
