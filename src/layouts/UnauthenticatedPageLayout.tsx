import React from 'react';
import { Header } from 'components';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const UnauthenticatedPageLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
    </>
  );
};

export default UnauthenticatedPageLayout;
