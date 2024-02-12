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
    tab.pathRegex.test(pathname)
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
    return <div className='w-full h-full mx-auto'>{children}</div>;
  }

  return (
    <Tabs value={currentSubPath} onValueChange={handleTabChange}>
      <Navbar
        title={
          <Link href={`/users/${params.username}`}>{params.username}</Link>
        }
      />
      <TabsList className='flex h-12 justify-start px-6 border-b-2'>
        {tabRoutes.map((tab) => (
          <TabsTrigger key={tab.subPath} value={tab.subPath}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={currentSubPath}>
        <div className='max-w-[1280px] w-full h-full flex gap-6 px-6 mt-3 mx-auto'>
          {userSection}
          {children}
        </div>
      </TabsContent>
    </Tabs>
  );
}
