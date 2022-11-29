import React from 'react';
import { ThemeToggle } from 'components';
import { Icon } from 'components/icons';

type Props = {
  children: React.ReactNode;
};

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="absolute top-4 right-4 flex flex-row items-center gap-4 z-10">
        <ThemeToggle className="h-6" />
        <a href="https://github.com/florianbuehler/orga-orga" target="_blank" rel="noreferrer">
          <Icon name="github" className="h-6 fill-current" />
        </a>
      </div>
      {children}
    </>
  );
};

export default BaseLayout;
