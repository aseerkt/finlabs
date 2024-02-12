import { fetchProject } from '@/lib/daos/projects';
import { notFound } from 'next/navigation';
import { ShowIfHasAccessFor } from '../ProjectContext';
import { ProjectPageParams } from '../types';
import DangerZone from './DangerZone';
import EditProject from './EditProject';

interface ProjectSessingsPageProps {
  params: ProjectPageParams;
}

export default async function ProjectSettingsPage({
  params,
}: ProjectSessingsPageProps) {
  const project = await fetchProject(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h2 className='mb-3 text-xl font-semibold border-b'>Project Settings</h2>
      <EditProject
        project={{
          id: project.id,
          name: project.name,
          description: project.description,
        }}
      />
      <div className='p-6'></div>
      <ShowIfHasAccessFor role='AUTHOR'>
        <DangerZone
          projectId={project.id}
          isPublic={project.isPublic}
          isActive={project.isActive}
        />
      </ShowIfHasAccessFor>
    </div>
  );
}
