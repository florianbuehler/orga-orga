import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, addDoc, getDocs } from 'firebase/firestore';
import { Icon } from 'components/icons';
import { database } from 'config/firebase-config';

type Patient = { name: string; createdAt: number };
type Project = { name: string; patients: Patient[] };

const getProjectDetailsFromFirestore = async (projectId: string): Promise<Project> => {
  const projectQuerySnapshotTask = getDoc(doc(database, `projects/${projectId}`));
  const patientsQuerySnapshotTask = getDocs(collection(database, `projects/${projectId}/patients`));

  const projectQuerySnapshot = await projectQuerySnapshotTask;
  const patientsQuerySnapshot = await patientsQuerySnapshotTask;

  const patients = patientsQuerySnapshot.docs.map((patient) => patient.data() as Patient);

  return {
    name: projectQuerySnapshot.data()?.name,
    patients: patients
  };
};

const addPatientToFirestore = (projectId: string, patient: Patient) =>
  addDoc(collection(database, `projects/${projectId}/patients`), patient);

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const [newPatientName, setNewPatientName] = useState<string | null>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  const { mutate: addPatientToProject } = useMutation(
    (patient: Patient) => addPatientToFirestore(projectId!, patient),
    {
      onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
    }
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPatientName(null);
  };

  const isSubmitDisabled = !newPatientName;

  const handleAddPatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addPatientToProject({ name: newPatientName!, createdAt: Date.now() });

    setShowModal(false);
    setNewPatientName(null);
  };

  if (project?.patients.length === 0) {
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
        <h2 className="text-2xl mb-2">Patients</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {project?.patients.map((patient, i) => (
              <tr key={patient.name}>
                <th>{i + 1}</th>
                <td>{patient.name}</td>
                <td>{new Date(patient.createdAt).toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDetails;
