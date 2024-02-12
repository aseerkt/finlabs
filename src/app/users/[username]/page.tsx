import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchUserByUsername } from '@/lib/daos/users';
import { Metadata } from 'next';

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
    <Card className='grow'>
      <CardHeader>
        <CardTitle className='text-4xl'>Hi, I am {user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className='font-bold text-xl'>User Feeds</h2>
      </CardContent>
    </Card>
  );
}
