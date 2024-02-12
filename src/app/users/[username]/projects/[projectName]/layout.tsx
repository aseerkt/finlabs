import { Navbar } from '@/components/navbar';
import BreadCrumbs from '@/components/ui/breadcrumbs';
import { fetchProject, getProjectRole } from '@/lib/daos/projects';
import { notFound } from 'next/navigation';
import { ProjectAccessProvider } from './ProjectContext';
import { ProjectPageParams } from './types';

interface ProjectPageLayoutProps {
  children: React.ReactNode;
  params: ProjectPageParams;
}

export default async function ProjectPageLayout({
  children,
  params,
}: ProjectPageLayoutProps) {
  const project = await fetchProject(params.username, params.projectName);

  if (!project) {
    notFound();
  }

  const role = await getProjectRole(project.id);

  const breadcrumbs = [
    { label: params.username, link: `/users/${params.username}` },
    { label: 'Projects', link: `/users/${params.username}/projects` },
    {
      label: params.projectName,
      link: `/users/${params.username}/projects/${params.projectName}`,
    },
  ];

  return (
    <div className='flex flex-col h-full'>
      <Navbar title={<BreadCrumbs breadcrumbs={breadcrumbs} />} />
      <ProjectAccessProvider role={role}>{children}</ProjectAccessProvider>
    </div>
  );
}
