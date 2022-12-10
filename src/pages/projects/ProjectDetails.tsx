import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addDonorToFirestore, deleteDonorFromFirestore, getProjectDetailsFromFirestore } from 'api';
import { AddDonorModal } from 'components';
import { Icon } from 'components/icons';
import { AuthenticatedPageLayout } from 'layouts';
import { Donor, NewDonor } from 'types';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  const { mutate: addDonorToProject } = useMutation((newDonor: NewDonor) => addDonorToFirestore(projectId!, newDonor), {
    onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
  });

  const { mutate: deleteDonorFromProject } = useMutation(
    (donor: Donor) => deleteDonorFromFirestore(projectId!, donor),
    {
      onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
    }
  );

  const [showModalDeleteDonor, setShowModalDeleteDonor] = useState<boolean>(false);
  const [donorToDelete, setDonorToDelete] = useState<Donor | null>();

  const setModalDeleteDonor = (donor: Donor) => {
    setDonorToDelete(donor);
    setShowModalDeleteDonor(true);
  };

  const handleCloseModal = () => {
    setShowModalDeleteDonor(false);
  };

  const handleDeleteDonor = (donor: Donor) => {
    setShowModalDeleteDonor(false);
    deleteDonorFromProject(donor);
  };

  const setActiveTab = (tabName: String) => {
    
  }

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
      <h1 className="text-2xl mb-2">{project?.name}</h1>
      <div className="tabs tabs-boxed">
        <div className="tab tab-active" onClick={() => setActiveTab('experiments')}>Donors</div>
        <div className="tab" onClick={() => setActiveTab('experiments')}>Experiments</div>
      </div>
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {project?.donors.map((donor, i) => (
              <tr key={donor.name}>
                <td onClick={() => navigate(`donors/${donor.id}`)} className="hover:cursor-pointer">
                  {i + 1}
                </td>
                <td onClick={() => navigate(`donors/${donor.id}`)} className="hover:cursor-pointer">
                  {donor.name}
                </td>
                <td onClick={() => navigate(`donors/${donor.id}`)} className="hover:cursor-pointer">
                  {new Date(donor.createdAt).toISOString()}
                </td>
                <td>
                  <Icon
                    name="eraser"
                    className="h-5 fill-current hover:cursor-pointer z-10"
                    onClick={() => setModalDeleteDonor(donor)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input
        type="checkbox"
        checked={showModalDeleteDonor}
        id="add-donor-modal"
        className="modal-toggle"
        onChange={() => null}
      />
      <div className="modal ml-72">
        <div className="modal-box relative">
          <button className="absolute right-4 top-3 hover:cursor-pointer" onClick={handleCloseModal}>
            <Icon name="close" className="h-5 fill-current" />
          </button>
          <h3 className="text-lg font-bold mb-6">Delete Donor</h3>
          <div className="flex gap-2 ml-auto mt-6">
            <button type="reset" className="btn btn-ghost gap-3" onClick={handleCloseModal}>
              <Icon name="ban" className="h-4 fill-current" />
              Cancel
            </button>
            <button type="submit" className="btn btn-primary gap-3" onClick={() => handleDeleteDonor(donorToDelete!)}>
              <Icon name="eraser" className="h-4 fill-current" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedPageLayout>
  );
};

export default ProjectDetails;
