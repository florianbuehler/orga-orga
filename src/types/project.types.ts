import { Donor } from './donor.types';

export type Project = {
  id: string;
  name: string;
  donors: Donor[];
};
