import { createContext } from 'react';

type Theme = {
  theme: 'dark' | 'light';
  isDarkTheme: boolean;
  onThemeToggle: (theme: 'dark' | 'light') => void;
};

const ThemeContext = createContext<Theme>({
  theme: 'dark',
  isDarkTheme: true,
  onThemeToggle: () => null
});

export default ThemeContext;
