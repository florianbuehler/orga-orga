import React from 'react';
import BaseLayout from './BaseLayout';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const UnauthenticatedPageLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <BaseLayout>
      <main className={className}>{children}</main>
    </BaseLayout>
  );
};

export default UnauthenticatedPageLayout;
