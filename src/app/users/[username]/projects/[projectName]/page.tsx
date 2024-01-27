import { getProjectByName } from '@/lib/daos/projects';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
  params: { username: string; projectName: string };
};

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectByName(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  return {
    title: `${project.name} | ${params.username}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectByName(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  return (
    <div className='w-full max-w-[1280px] px-6'>
      <h1>{project.name}</h1>
    </div>
  );
}
