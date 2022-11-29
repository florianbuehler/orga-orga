import React from 'react';
import BaseLayout from './BaseLayout';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const UnauthenticatedLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <BaseLayout>
      <main className={className}>{children}</main>
    </BaseLayout>
  );
};

export default UnauthenticatedLayout;
