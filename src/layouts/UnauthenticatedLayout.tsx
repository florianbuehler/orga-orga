import React from 'react';
import { ThemeToggle } from 'components';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const UnauthenticatedLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <>
      <ThemeToggle className="absolute top-4 right-4" />
      <main className={className}>{children}</main>
    </>
  );
};

export default UnauthenticatedLayout;
