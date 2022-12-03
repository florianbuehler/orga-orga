import React, { useState } from 'react';
import { Icon } from 'components/icons';

const ProjectDetails: React.FC = () => {
  const [patients, setPatients] = useState();
  const [newPatientName, setNewPatientName] = useState<string | null>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPatientName(null);
  };

  const isSubmitDisabled = !newPatientName;

  const handleAddPatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    setNewPatientName(null);

    console.log(newPatientName);
  };

  if (!patients) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold">No patients yet</h2>
            <p className="py-6">Click the button below to start and add your first patient.</p>
            <button className="btn btn-primary gap-3" onClick={() => setShowModal(true)}>
              <Icon name="add-patient" className="h-5 fill-current" />
              Add patient
            </button>
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
                <h3 className="text-lg font-bold mb-6">Add User</h3>
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
          </div>
        </div>
      </div>
    );
  }

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default ProjectDetails;
