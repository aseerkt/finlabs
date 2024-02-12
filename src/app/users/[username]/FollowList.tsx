import { Card } from '@/components/ui/card';
import Link from 'next/link';
import FollowButton from './FollowButton';

interface IFollow {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
}

interface FollowListProps {
  follows: IFollow[];
  currentUserId?: number;
}

export default function FollowList({
  follows,
  currentUserId,
}: FollowListProps) {
  return (
    <div className='flex grow flex-col space-y-3'>
      {follows.map((follow) => (
        <FollowEntry key={follow.id} follow={follow}>
          <FollowButton
            userId={follow.id}
            isFollowing={follow.isFollowing}
            isCurrentUser={currentUserId === follow.id}
          />
        </FollowEntry>
      ))}
    </div>
  );
}

function FollowEntry({
  follow,
  children,
}: {
  follow: IFollow;
  children: React.ReactNode;
}) {
  return (
    <Card className='p-3 w-full' key={follow.id}>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <Link className='hover:underline' href={`/users/${follow.username}`}>
            <b className='font-semibold mr-2'>{follow.username}</b>
          </Link>{' '}
          <span className='text-gray-500'>{follow.name}</span>
        </div>
        {children}
      </div>
    </Card>
  );
}
