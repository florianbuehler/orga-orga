import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { database } from 'config/firebase-config';
import { Donor, NewDonor, Project } from 'types';

export const getProjectDetailsFromFirestore = async (projectId: string): Promise<Project> => {
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

export const addDonorToFirestore = (projectId: string, newDonor: NewDonor) =>
  addDoc(collection(database, `projects/${projectId}/donors`), newDonor);

export const deleteDonorFromFirestore = (projectId: string, donor: Donor) =>
  deleteDoc(doc(database, `projects/${projectId}/donors`, donor.id));
