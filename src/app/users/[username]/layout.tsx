import { fetchUserByUsername } from '@/lib/daos/users';
import { PropsWithChildren } from 'react';
import UserProfileSection from './UserProfileSection';
import TabLayoutList from './UserTabLayout';

type UserLayoutProps = PropsWithChildren<{
  params: { username: string };
}>;

export default async function UserLayout({
  children,
  params,
}: UserLayoutProps) {
  const user = await fetchUserByUsername(params.username);

  return (
    <div className='h-screen flex flex-col'>
      <TabLayoutList userSection={<UserProfileSection user={user} />}>
        {children}
      </TabLayoutList>
    </div>
  );
}
