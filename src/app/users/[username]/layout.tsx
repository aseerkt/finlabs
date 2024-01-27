import { Navbar } from '@/components/navbar';
import { getAuthSesssion } from '@/lib/authUtils';
import { fetchUserByUsername } from '@/lib/daos/users';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import TabLayoutList from './TabLayout';
import UserProfileSection from './UserProfileSection';
import { tabRoutes } from './constants';

type UserLayoutProps = PropsWithChildren<{
  params: { username: string };
}>;



const getCurrentTab = (pathname: string, params: any) => {
  const currentTabIndex = tabRoutes.findIndex((tab) =>
    tab.pathRegex.test(pathname)
  );

  if (currentTabIndex === -1) return null;

  return tabRoutes[currentTabIndex].id;
};

export default async function UserLayout({
  children,
  params,
}: UserLayoutProps) {
  const user = await fetchUserByUsername(params.username);
  const session = await getAuthSesssion();

  if (!user) {
    notFound();
  }

  const currentTab = getCurrentTab(headers().get('next-url')!, params);

  const isCurrentUser = params.username === session?.user.username;

  return (
    <>
      <Navbar title={user.username} />
      {currentTab ? (
        <TabLayoutList currentTab={currentTab}>
          <div className='max-w-[1280px] w-full flex gap-6 px-6 mt-3 mx-auto'>
            <UserProfileSection user={user} isCurrentUser={isCurrentUser} />
            {children}
          </div>
        </TabLayoutList>
      ) : (
        children
      )}
    </>
  );
}
