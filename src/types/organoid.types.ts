export type NewOrganoid = {
    generation: number;
    sample: number;
  };
  
export type Organoid = {
    id: string;
  } & NewOrganoid;
  