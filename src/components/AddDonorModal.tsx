import React, { cloneElement, useState } from 'react';
import { Donor } from 'types';
import { Icon } from './icons';

type Props = {
  trigger: React.ReactElement;
  onAddDonor: (donor: Donor) => void;
};

const AddDonorModal: React.FC<Props> = ({ trigger, onAddDonor }) => {
  const [newDonorName, setNewDonorName] = useState<string | null>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewDonorName(null);
  };

  const isSubmitDisabled = !newDonorName;

  const handleAddDonor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddDonor({ name: newDonorName!, createdAt: Date.now() });

    setShowModal(false);
    setNewDonorName(null);
  };

  return (
    <>
      {cloneElement(trigger, { onClick: () => setShowModal(true) })}
      <input type="checkbox" checked={showModal} id="add-donor-modal" className="modal-toggle" onChange={() => null} />
      <div className="modal ml-72">
        <div className="modal-box relative">
          <button className="absolute right-4 top-3 hover:cursor-pointer" onClick={handleCloseModal}>
            <Icon name="close" className="h-5 fill-current" />
          </button>
          <h3 className="text-lg font-bold mb-6">Add Donor</h3>
          <form className="form-control w-full" onSubmit={handleAddDonor}>
            <label className="label">
              <span className="label-text">Donor ID</span>
            </label>
            <input
              type="text"
              value={newDonorName || ''}
              className="input input-bordered w-full"
              onChange={(e) => setNewDonorName(e.target.value)}
            />
            <div className="flex gap-2 ml-auto mt-6">
              <button type="reset" className="btn btn-ghost gap-3" onClick={handleCloseModal}>
                <Icon name="ban" className="h-4 fill-current" />
                Cancel
              </button>
              <button type="submit" className="btn btn-primary gap-3" disabled={isSubmitDisabled}>
                <Icon name="add-donor" className="h-4 fill-current" />
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDonorModal;
