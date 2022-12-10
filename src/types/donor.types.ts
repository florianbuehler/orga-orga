export type NewDonor = {
  name: string;
  createdAt: number;
};

export type Donor = {
  id: string;
} & NewDonor;
