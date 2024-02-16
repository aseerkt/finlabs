import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchProject } from '@/lib/daos/projects';
import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KanbanBoard } from './(kanban)';
import { TaskModal } from './(task)';
import { ShowIfHasAccessFor } from './ProjectContext';
import { getBoardDataFromColumns } from './serverUtils';
import { ProjectPageParams } from './types';

interface ProjectPageProps {
  params: ProjectPageParams;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await fetchProject(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  return {
    title: `${params.username}/${project.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await fetchProject(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  const board = getBoardDataFromColumns(project.columns);

  return (
    <>
      <header className='w-full px-6 py-3 mt-5 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h1 className='text-xl font-bold'>{project.name} </h1>
          <Badge>{project.isPublic ? 'Public' : 'Private'}</Badge>
        </div>
        <ShowIfHasAccessFor role='ADMIN'>
          <Button variant='ghost' size='icon' asChild>
            <Link href={`./${params.projectName}/settings`}>
              <SettingsIcon />
            </Link>
          </Button>
        </ShowIfHasAccessFor>
      </header>
      <KanbanBoard projectId={project.id} board={board} />
      <TaskModal />
    </>
  );
}
