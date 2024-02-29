'use client';

import { Navbar } from '@/components/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { tabRoutes } from './constants';

type UserTabLayoutProps = PropsWithChildren<{
  userSection: React.ReactNode;
}>;

const getCurrentSubPath = (pathname: string) => {
  const currentTabIndex = tabRoutes.findIndex((tab) =>
    tab.pathRegex.test(pathname),
  );

  if (currentTabIndex === -1) return null;

  return tabRoutes[currentTabIndex].subPath;
};

export default function UserTabLayout({
  children,
  userSection,
}: UserTabLayoutProps) {
  const pathname = usePathname();
  const params = useParams<{ username: string }>();
  const router = useRouter();

  const handleTabChange = (subPath: string) => {
    router.push(`/users/${params.username}${subPath}`);
  };

  const currentSubPath = getCurrentSubPath(pathname);

  if (!currentSubPath) {
    return <div className='mx-auto h-full w-full'>{children}</div>;
  }

  return (
    <Tabs value={currentSubPath} onValueChange={handleTabChange}>
      <Navbar
        title={
          <Link href={`/users/${params.username}`}>{params.username}</Link>
        }
      />
      <TabsList className='flex h-12 justify-start border-b-2 px-6'>
        {tabRoutes.map((tab) => (
          <TabsTrigger key={tab.subPath} value={tab.subPath}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={currentSubPath}>
        <div className='relative mx-auto mt-3 flex h-full w-full max-w-[1280px] px-6'>
          <div className='absolute w-[296px]'>{userSection}</div>
          <div className='ml-[320px] grow'>{children}</div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
