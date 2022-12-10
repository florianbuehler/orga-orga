import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { database } from 'config/firebase-config';
import { Donor, DonorDetail, NewDonor, Project, Organoid } from 'types';

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
/*
export const getDonorDetailsFromFirestore = async (projectId: string, donorId: string): Promise<DonorDetail> => {
  const donorQuerySnapshotTask = getDoc(doc(database, `projects/${projectId}/donors/${donorId}`));
  const organoidsQuerySnapshotTask = getDocs(collection(database, `projects/${projectId}/donors/${donorId}/organoids`));

  const donorQuerySnapshot = await donorQuerySnapshotTask;
  const organoidsQuerySnapshot = await organoidsQuerySnapshotTask;

  const organoids = organoidsQuerySnapshot.docs.map((Organoid) => {
    const organoidQuerySnapshotTask = getDocs(collection(database, `projects/${projectId}/organoids/${Organoid.id}`));
    const organoidQuerySnapshot = organoidQuerySnapshotTask;
    return {
      id: organoidQuerySnapshot.id,
      ...organoidQuerySnapshot.data()
    } as Organoid;
  });

  return {
    name: donorQuerySnapshotTask.data()?.name,
    organoids: organoids
  };
};
*/

export const addDonorToFirestore = (projectId: string, newDonor: NewDonor) =>
  addDoc(collection(database, `projects/${projectId}/donors`), newDonor);

export const deleteDonorFromFirestore = (projectId: string, donor: Donor) =>
  deleteDoc(doc(database, `projects/${projectId}/donors`, donor.id));
