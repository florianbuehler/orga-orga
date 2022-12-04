import React, { cloneElement, useState } from 'react';
import { Patient } from 'types';
import { Icon } from './icons';

type Props = {
  trigger: React.ReactElement;
  onAddPatient: (patient: Patient) => void;
};

const AddPatientModal: React.FC<Props> = ({ trigger, onAddPatient }) => {
  const [newPatientName, setNewPatientName] = useState<string | null>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPatientName(null);
  };

  const isSubmitDisabled = !newPatientName;

  const handleAddPatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddPatient({ name: newPatientName!, createdAt: Date.now() });

    setShowModal(false);
    setNewPatientName(null);
  };

  return (
    <>
      {cloneElement(trigger, { onClick: () => setShowModal(true) })}
      <input
        type="checkbox"
        checked={showModal}
        id="add-patient-modal"
        className="modal-toggle"
        onChange={() => null}
      />
      <div className="modal ml-72">
        <div className="modal-box relative">
          <button className="absolute right-4 top-3 hover:cursor-pointer" onClick={handleCloseModal}>
            <Icon name="close" className="h-5 fill-current" />
          </button>
          <h3 className="text-lg font-bold mb-6">Add Patient</h3>
          <form className="form-control w-full" onSubmit={handleAddPatient}>
            <label className="label">
              <span className="label-text">Patient ID</span>
            </label>
            <input
              type="text"
              value={newPatientName || ''}
              className="input input-bordered w-full"
              onChange={(e) => setNewPatientName(e.target.value)}
            />
            <div className="flex gap-2 ml-auto mt-6">
              <button type="reset" className="btn btn-ghost gap-3" onClick={handleCloseModal}>
                <Icon name="ban" className="h-4 fill-current" />
                Cancel
              </button>
              <button type="submit" className="btn btn-primary gap-3" disabled={isSubmitDisabled}>
                <Icon name="add-patient" className="h-4 fill-current" />
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPatientModal;
