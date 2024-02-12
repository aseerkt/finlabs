import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { ProjectPageParams } from '../types';
import SettingsTabs from './SettingsTabs';

interface ProjectSettingsLayoutProps {
  children: React.ReactNode;
  params: ProjectPageParams;
}

export default function ProjectSettingsLayout({
  children,
  params,
}: ProjectSettingsLayoutProps) {
  const projectLink = `/users/${params.username}/projects/${params.projectName}`;

  return (
    <div className='flex flex-col grow'>
      <header className='flex gap-2 h-14 px-6 items-center border-b'>
        <Link href={projectLink}>
          <ArrowLeftIcon />
        </Link>
        <h1 className='text-xl font-semibold shadow-sm'>Settings</h1>
      </header>
      <div className='grow flex'>
        <SettingsTabs />
        <div className='p-6 flex grow'>
          <div className='max-w-screen-lg w-full md:ml-20'>{children}</div>
        </div>
      </div>
    </div>
  );
}
