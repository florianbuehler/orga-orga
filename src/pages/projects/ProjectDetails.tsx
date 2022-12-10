import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, addDoc, getDocs } from 'firebase/firestore';
import { AddDonorModal } from 'components';
import { Icon } from 'components/icons';
import { database } from 'config/firebase-config';
import { AuthenticatedPageLayout } from 'layouts';
import { Donor, NewDonor } from 'types';

type Project = { name: string; donors: Donor[] };

const getProjectDetailsFromFirestore = async (projectId: string): Promise<Project> => {
  const projectQuerySnapshotTask = getDoc(doc(database, `projects/${projectId}`));
  const donorsQuerySnapshotTask = getDocs(collection(database, `projects/${projectId}/donors`));

  const projectQuerySnapshot = await projectQuerySnapshotTask;
  const donorsQuerySnapshot = await donorsQuerySnapshotTask;

  const donors = donorsQuerySnapshot.docs.map((donor) => {
    return {
      id: donor.id,
      ...donor.data()
    } as Donor;
  });

  return {
    name: projectQuerySnapshot.data()?.name,
    donors: donors
  };
};

const addDonorToFirestore = (projectId: string, newDonor: NewDonor) =>
  addDoc(collection(database, `projects/${projectId}/donors`), newDonor);

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  const { mutate: addDonorToProject } = useMutation((newDonor: NewDonor) => addDonorToFirestore(projectId!, newDonor), {
    onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
  });

  if (project?.donors.length === 0) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold">No donors yet</h2>
            <p className="py-6">Click the button below to start and add your first donor.</p>
            <AddDonorModal
              trigger={
                <button className="btn btn-primary gap-3">
                  <Icon name="add-donor" className="h-5 fill-current" />
                  Add donor
                </button>
              }
              onAddDonor={addDonorToProject}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthenticatedPageLayout
      breadcrumbs={[
        { to: '..', iconName: 'flask', text: 'Projects' },
        { to: `../${projectId}`, text: project?.name }
      ]}
    >
      <div className="mt-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl">Donors</h2>
          <AddDonorModal
            trigger={<Icon name="add-donor" className="h-5 fill-current hover:cursor-pointer" />}
            onAddDonor={addDonorToProject}
          />
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {project?.donors.map((donor, i) => (
              <tr key={donor.name} onClick={() => navigate(`donors/${donor.id}`)} className="hover:cursor-pointer">
                <th>{i + 1}</th>
                <td>{donor.name}</td>
                <td>{new Date(donor.createdAt).toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedPageLayout>
  );
};

export default ProjectDetails;
