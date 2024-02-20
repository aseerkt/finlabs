import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchUserByUsername } from '@/lib/daos/users';
import { Metadata } from 'next';
import UserBio from './UserBio';

export type UserPageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  // read route params
  const { username } = params;

  const user = await fetchUserByUsername(username);

  return {
    title: {
      default: `${user.username} (${user.name})`,
      template: `%s - ${user.username} (${user.name}) | Finlabs`,
    },
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await fetchUserByUsername(params.username, true);

  return (
    <Card className='grow min-h-[400px] h-max'>
      <CardHeader>
        <CardTitle className='text-xl border-b-2 pb-1'>User Bio</CardTitle>
      </CardHeader>
      <CardContent>
        <UserBio userId={user.id} bio={user.bio} />
      </CardContent>
    </Card>
  );
}
