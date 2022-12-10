import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Icon } from 'components/icons';
import { database } from 'config/firebase-config';
import { AuthenticatedPageLayout } from 'layouts';
import { DonorDetail, Organoid, NewOrganoid } from 'types';

const DonorDetails: React.FC = () => {
  const { projectId } = useParams();
  const { donorId } = useParams();
  const queryClient = useQueryClient();



  return (
    <AuthenticatedPageLayout breadcrumbs={[{ to: '..', iconName: 'flask', text: 'Projects' }]}>
      <h1>{projectId}</h1>
      <h1>{donorId}</h1>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="card w-40 bg-base-200 shadow-xl">
            <figure className="pt-5">
              <img className=" w-20 mask mask-circle" src="https://storage.googleapis.com/boom-ai-images/results/3AGhqoGcDyT2mJRbv0fq/00003.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Organoid 1</h2>
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div> 
          <div className="card w-40 bg-base-200 shadow-xl">
            <figure className="pt-5">
              <img className="w-20 mask mask-circle" src="https://storage.googleapis.com/boom-ai-images/results/zdL281ifYrfKywTRr5rw/00001.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Organoid 2</h2>
            </div>
          </div>
        </div>
        <div className="divider"></div> 
        <div className="flex flex-col w-full lg:flex-row">
          <div className="card w-40 bg-base-200 shadow-xl">
            <figure className="pt-5">
              <img className="w-20 mask mask-circle" src="https://storage.googleapis.com/boom-ai-images/results/FwLktLkUqjCz2y2rlatn/00002.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Organoid 3</h2>
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div> 
          <div className="card w-40 bg-base-200 shadow-xl">
            <figure className="pt-5">
              <img className="w-20 mask mask-circle" src="https://storage.googleapis.com/boom-ai-images/results/Tgh2LD27ynBN6cmDSCJA/00006.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Organoid 4</h2>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedPageLayout>
  );
};

export default DonorDetails;
