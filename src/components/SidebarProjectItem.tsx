import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectDetailsFromFirestore } from '../api';
import { Icon } from './icons';

type Props = {
  projectId: string;
};

const SidebarProjectItem: React.FC<Props> = ({ projectId }) => {
  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  return (
    <>
      <NavLink to={`/projects/${projectId}`} className="flex items-center">
        <Icon name="project" className="h-5 fill-current" />
        <span>Colon Age</span>
      </NavLink>
      <details className="ml-8 text-sm hover:bg-transparent">
        <summary className="list-none flex">
          <Icon name="hands-holding-heart" className="h-4 fill-current" />
          <span className="ml-2">Donors</span>
        </summary>
        <ol>
          {project?.donors.map((donor) => (
            <li key={donor.id}>
              <NavLink to={`/projects/${projectId}/donors/${donor.id}`}>{donor.name}</NavLink>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
};

export default SidebarProjectItem;
