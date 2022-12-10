import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { AddDonorModal } from 'components';
import { Icon } from 'components/icons';
import { database } from 'config/firebase-config';
import { Donor, NewDonor } from 'types';

type Project = { name: string; donors: Donor[] };

const getProjectDetailsFromFirestore = async (projectId: string): Promise<Project> => {
  const projectQuerySnapshotTask = getDoc(doc(database, `projects/${projectId}`));
  const donorsQuerySnapshotTask = getDocs(collection(database, `projects/${projectId}/donors`));

  const projectQuerySnapshot = await projectQuerySnapshotTask;
  const donorsQuerySnapshot = await donorsQuerySnapshotTask;

  const donors = donorsQuerySnapshot.docs.map((donor) => donor.data() as Donor);

  console.log('donors', donors);

  return {
    name: projectQuerySnapshot.data()?.name,
    donors: donors
  };
};

const addDonorToFirestore = (projectId: string, newDonor: NewDonor) =>
  addDoc(collection(database, `projects/${projectId}/donors`), newDonor);

const deleteDonor = (projectId: string, donor: donor) =>
  deleteDoc(doc(database, `projects/${projectId}/donors`, donor.id));

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  const { mutate: addDonorToProject } = useMutation((newDonor: NewDonor) => addDonorToFirestore(projectId!, newDonor), {
    onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
  });

  const { mutate: deleteDonorFromProject } = useMutation((Donor: donor) => deleteDonor(projectId!, donor), {
    onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
  });

  const [showModalDeleteDonor, setShowModalDeleteDonor] = useState<boolean>(false);
  const [donorToDelete, setdonorToDelete] = useState<Donor | null>();

  const setModalDeleteDonor = (Donor: donor) => {
    setdonorToDelete(donor);
    setShowModalDeleteDonor(true);
  };
  
  const handleCloseModal = () => {
    setShowModalDeleteDonor(false);
  };
  
  const handleDeleteDonor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowModalDeleteDonor(false);
    deleteDonorFromProject(donor);
  };

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
    <div className="px-4 py-2">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <NavLink to=".." className="flex items-center gap-2">
              <Icon name="flask" className="h-3 fill-current" />
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to={`../${projectId}`} className="flex items-center gap-2">
              {project?.name}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mt-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl">Donors</h2>
          <AddDonorModal
            trigger={<button>Löschen</button>}
            onAddDonor={addDonorToProject}
          />
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {project?.donors.map((donor, i) => (
              <tr key={donor.name}>
                <th>{i + 1}</th>
                <td>{donor.name}</td>
                <td>{new Date(donor.createdAt).toISOString()}</td>
                <td>
                <Icon name="exit" className="h-5 fill-current hover:cursor-pointer" onClick={() => setModalDeleteDonor(donor)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type="checkbox" checked={showModalDeleteDonor} id="add-donor-modal" className="modal-toggle" onChange={() => null} />
      <div className="modal ml-72">
        <div className="modal-box relative">
          <button className="absolute right-4 top-3 hover:cursor-pointer" onClick={handleCloseModal}>
            <Icon name="close" className="h-5 fill-current" />
          </button>
          <h3 className="text-lg font-bold mb-6">Delete Donor</h3>
          <form className="form-control w-full" onSubmit={handleDeleteDonor}>
            <div className="flex gap-2 ml-auto mt-6">
              <button type="reset" className="btn btn-ghost gap-3" onClick={handleCloseModal}>
                <Icon name="ban" className="h-4 fill-current" />
                Cancel
              </button>
              <button type="submit" className="btn btn-primary gap-3">
                <Icon name="add-donor" className="h-4 fill-current" />
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default ProjectDetails;
