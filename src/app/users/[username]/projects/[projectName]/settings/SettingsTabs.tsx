'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SettingsIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ProjectPageParams } from '../types';

export default function SettingsTabs() {
  const params = useParams<ProjectPageParams>();
  const pathname = usePathname();

  const projectLink = `/users/${params.username}/projects/${params.projectName}`;

  const links = [
    {
      label: 'Project settings',
      icon: <SettingsIcon />,
      href: `${projectLink}/settings`,
    },
    {
      label: 'Manage access',
      icon: <UsersIcon />,
      href: `${projectLink}/settings/access`,
    },
  ];

  return (
    <ul className='w-96 p-6 flex flex-col gap-2 border-r-2'>
      {links.map((link) => (
        <li key={link.label}>
          <Button
            className={cn(
              'flex gap-3 justify-start items-center',
              pathname === link.href && 'bg-slate-200'
            )}
            variant='ghost'
            asChild
          >
            <Link href={link.href}>
              {link.icon}
              {link.label}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
