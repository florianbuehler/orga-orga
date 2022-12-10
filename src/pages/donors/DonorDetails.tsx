import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Icon } from 'components/icons';
import { database } from 'config/firebase-config';
import { AuthenticatedPageLayout } from 'layouts';
import { Donor, Organoid, NewOrganoid } from 'types';

const DonorDetails: React.FC = () => {
  return (
    <AuthenticatedPageLayout breadcrumbs={[{ to: '..', iconName: 'flask', text: 'Projects' }]}>
      <h1>donor page</h1>
    </AuthenticatedPageLayout>
  );
};

export default DonorDetails;
