import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDonorFromFirestore } from 'api';
import { Donor } from 'types';
import { Icon } from './icons';

type Props = {
  projectId: string;
  donors: Donor[] | undefined;
};

const DonorsTable: React.FC<Props> = ({ projectId, donors }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showModalDeleteDonor, setShowModalDeleteDonor] = useState<boolean>(false);
  const [donorToDelete, setDonorToDelete] = useState<Donor | null>();

  const { mutate: deleteDonorFromProject } = useMutation(
    (donor: Donor) => deleteDonorFromFirestore(projectId!, donor),
    {
      onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
    }
  );

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

  return (
    <>
      <div className="overflow-x-auto mt-2 rounded-lg border border-base-200">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-0"></th>
              <th>Name</th>
              <th>Created At</th>
              <th className="w-0"></th>
            </tr>
          </thead>
          <tbody>
            {donors?.map((donor, i) => (
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
    </>
  );
};

export default DonorsTable;
