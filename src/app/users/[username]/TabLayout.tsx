'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { tabPathMap, tabRoutes } from './constants';

type UserTabLayoutProps = PropsWithChildren<{
  currentTab: string;
}>;

export default function UserTabLayout({
  children,
  currentTab,
}: UserTabLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const handleTabChange = (value: string) => {
    const subPath = tabPathMap[value as keyof typeof tabPathMap];
    router.push(`/users/${params.username}${subPath}`);
  };

  return (
    <Tabs defaultValue='overview' onValueChange={handleTabChange}>
      <TabsList className='flex justify-start px-6'>
        {tabRoutes.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={currentTab}>{children}</TabsContent>
    </Tabs>
  );
}
