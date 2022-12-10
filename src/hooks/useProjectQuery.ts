import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProjectDetailsFromFirestore } from 'api';
import { Project } from 'types';

const useProjectQuery = (projectId: string): UseQueryResult<Project> =>
  useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId));

export default useProjectQuery;
