import React from 'react';
import { AuthenticatedPageLayout } from 'layouts';

const DonorDetails: React.FC = () => {
  return (
    <AuthenticatedPageLayout breadcrumbs={[{ to: '..', iconName: 'flask', text: 'Projects' }]}>
      <h1>donor page</h1>
    </AuthenticatedPageLayout>
  );
};

export default DonorDetails;
