import ProjectCard from '@/components/ProjectCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchProjectsForUser } from '@/lib/daos/projects';
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
      <Card className='grow flex flex-col items-center justify-center'>
        <CardHeader>
          <CardTitle>No projects added yet!</CardTitle>
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
