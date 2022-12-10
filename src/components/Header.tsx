import React from 'react';
import { Icon } from './icons';
import { ThemeToggle } from './index';

type Props = {
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ children }) => {
  return (
    <nav className="flex px-4 py-3">
      {children}
      <div className="flex flex-row items-center gap-3 ml-auto">
        <ThemeToggle />
        <a href="https://github.com/florianbuehler/orga-orga" target="_blank" rel="noreferrer">
          <Icon name="github" className="h-5 fill-current" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
