import { Organoid } from './organoid.types';

export type NewDonor = {
  name: string;
  createdAt: number;
};

export type Donor = {
  id: string;
} & NewDonor;

export type DonorDetail = {
  name: string
  donors: Organoid[];
}
