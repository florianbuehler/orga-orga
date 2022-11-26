import React, { useEffect, useState } from 'react';
import ThemeContext from 'context/ThemeContext';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    if (localStorage.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        isDarkTheme: theme === 'dark',
        onThemeToggle: (theme) => setTheme(theme)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
