import ProjectCard from '@/components/ProjectCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchProjectsForUser } from '@/lib/daos/projects';
import { BookAIcon } from 'lucide-react';
import EmptyProjectsPlaceHolder from './[projectName]/EmptyProjectsPlaceholder';

type UserProjectsPageProps = {
  params: { username: string };
};

export default async function UserProjectsPage({
  params,
}: UserProjectsPageProps) {
  const projects = await fetchProjectsForUser(params.username);

  if (Array.isArray(projects) && projects.length === 0) {
    return (
      <Card className='grow py-12 flex flex-col items-center justify-center'>
        <CardHeader>
          <CardTitle>No projects added yet!</CardTitle>
          <CardDescription className='text-center flex justify-center text-gray-500 pt-4'>
            <BookAIcon size={56} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyProjectsPlaceHolder />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grow'>
      <ul className='flex flex-col gap-2'>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>
    </div>
  );
}
