import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, addDoc, getDocs } from 'firebase/firestore';
import { Icon } from 'components/icons';
import { database } from 'config/firebase-config';
import { Patient } from 'types';
import { AddPatientModal } from '../../components';

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

  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  const { mutate: addPatientToProject } = useMutation(
    (patient: Patient) => addPatientToFirestore(projectId!, patient),
    {
      onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
    }
  );

  if (project?.patients.length === 0) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold">No patients yet</h2>
            <p className="py-6">Click the button below to start and add your first patient.</p>
            <AddPatientModal
              trigger={
                <button className="btn btn-primary gap-3">
                  <Icon name="add-patient" className="h-5 fill-current" />
                  Add patient
                </button>
              }
              onAddPatient={addPatientToProject}
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
          <h2 className="text-2xl">Patients</h2>
          <AddPatientModal
            trigger={<Icon name="add-patient" className="h-5 fill-current hover:cursor-pointer" />}
            onAddPatient={addPatientToProject}
          />
        </div>
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
