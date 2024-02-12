import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchProject } from '@/lib/daos/projects';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectPageParams } from '../../types';
import InviteCollaborators from './InviteCollaborators';
import ManageAccess from './ManageAccess';

interface ManageProjectAccessPageProps {
  params: ProjectPageParams;
}

export default async function ManageProjectAcessPage({
  params,
}: ManageProjectAccessPageProps) {
  const project = await fetchProject(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-5'>
      <section>
        <h2 className='font-semibold text-xl mb-3'>Who has access</h2>
        <Card>
          <CardHeader className='p-4'>
            <CardTitle>
              {project?.isPublic ? 'Public project' : 'Private project'}
            </CardTitle>
            <CardDescription>
              {project?.isPublic
                ? 'This project is public and visible to anyone.'
                : 'Only those with access to this project can view it.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='p-4 pt-0'>
            <Button variant='outline' asChild>
              <Link href='.'>Manage</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <section>
        <div>
          <h2 className='font-semibold text-xl mb-3'>Invite collaborators</h2>
          <InviteCollaborators projectId={project.id} />
        </div>
      </section>
      <section>
        <h2 className='font-semibold text-xl mb-3'>Manage access</h2>
        <ManageAccess projectId={project.id} />
      </section>
    </div>
  );
}
