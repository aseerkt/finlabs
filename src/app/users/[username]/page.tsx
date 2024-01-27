import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchUserByUsername } from '@/lib/daos/users';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type UserPageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  // read route params
  const { username } = params;

  const user = await fetchUserByUsername(username);

  if (!user) {
    return notFound();
  }

  return {
    title: `${user?.username} (${user?.name})`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await fetchUserByUsername(params.username);

  if (!user) {
    notFound();
    return null;
  }

  return (
    <Card className='grow'>
      <CardHeader>
        <CardTitle className='text-4xl'>Welcome {user?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className='font-bold text-xl'>Features Roadmap</h2>
        <ul>
          <li>create project</li>
          <li>list projects</li>
          <li>create columns - kanban</li>
          <li>create tasks</li>
          <li>drag n drop tasks</li>
          <li>invite collaborators</li>
          <li>assign tasks</li>
          <li>change project visibility - private / public</li>
          <li>delete project</li>
          <li>star project</li>
          <li>follow unfollow peoples</li>
          <li>user feeds</li>
        </ul>
      </CardContent>
    </Card>
  );
}
