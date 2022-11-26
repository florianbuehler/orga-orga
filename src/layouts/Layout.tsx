import React from 'react';
import { useTheme } from 'hooks';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const themeName = theme === 'light' ? 'bumblebee' : 'dark';

  return <div data-theme={themeName}>{children}</div>;
};

export default Layout;
