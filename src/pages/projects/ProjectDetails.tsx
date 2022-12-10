import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addDonorToFirestore, getProjectDetailsFromFirestore } from 'api';
import { AddDonorModal, DonorsTable } from 'components';
import { Icon } from 'components/icons';
import { AuthenticatedPageLayout } from 'layouts';
import { NewDonor, Project } from 'types';

type Tab = 'donors' | 'experiments';

const getTabContent = (tab: Tab, project: Project | undefined): React.ReactNode => {
  switch (tab) {
    case 'donors':
      return project && <DonorsTable projectId={project.id} donors={project?.donors} />;
    case 'experiments':
      return null;
  }
};

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<Tab>('donors');

  const { data: project } = useQuery(['project-details', projectId], () => getProjectDetailsFromFirestore(projectId!));

  const { mutate: addDonorToProject } = useMutation((newDonor: NewDonor) => addDonorToFirestore(projectId!, newDonor), {
    onSuccess: () => queryClient.invalidateQueries(['project-details', projectId])
  });

  if (project?.donors.length === 0) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold">No donors yet</h2>
            <p className="py-6">Click the button below to start and add your first donor.</p>
            <AddDonorModal
              trigger={
                <button className="btn btn-primary gap-3">
                  <Icon name="add-donor" className="h-5 fill-current" />
                  Add donor
                </button>
              }
              onAddDonor={addDonorToProject}
            />
          </div>
        </div>
      </div>
    );
  }

  const getTabClassName = (tab: Tab) => `tab ${activeTab === tab ? 'tab-active' : ''}`;

  return (
    <AuthenticatedPageLayout
      breadcrumbs={[
        { to: '..', iconName: 'flask', text: 'Projects' },
        { to: `../${projectId}`, text: project?.name }
      ]}
    >
      <h1 className="text-3xl mb-3">{project?.name}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolores expedita fugiat illo incidunt magnam nam
        nisi odio quibusdam quo. Aperiam doloribus eos, error excepturi fugit laborum, magni maiores necessitatibus
        neque obcaecati quas quasi, quisquam sit. Ea eius esse, ex expedita id molestias, mollitia nesciunt non quod
        similique tempore voluptas.
      </p>
      <div className="flex justify-between items-center mt-10">
        <div className="tabs tabs-boxed">
          <div className={getTabClassName('donors')} onClick={() => setActiveTab('donors')}>
            Donors
          </div>
          <div className={getTabClassName('experiments')} onClick={() => setActiveTab('experiments')}>
            Experiments
          </div>
        </div>
        <AddDonorModal
          trigger={<Icon name="add-donor" className="h-5 fill-current hover:cursor-pointer" />}
          onAddDonor={addDonorToProject}
        />
      </div>
      {getTabContent(activeTab, project)}
    </AuthenticatedPageLayout>
  );
};

export default ProjectDetails;
