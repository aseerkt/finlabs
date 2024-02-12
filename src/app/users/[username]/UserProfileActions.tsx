'use client';

import { useSession } from 'next-auth/react';
import EditProfileModal from './EditProfileModal';
import FollowButton from './FollowButton';

interface UserActionsProps {
  user: {
    id: number;
    username: string;
    name: string;
    website: string | null;
    location: string | null;
    isFollowing: boolean;
  };
}

export default function UserProfileActions({ user }: UserActionsProps) {
  const session = useSession();

  if (session.status !== 'authenticated') return null;

  const isCurrentUser = user.username === session?.data?.user.username;

  return (
    <div className='w-full'>
      {isCurrentUser ? (
        <EditProfileModal user={user} />
      ) : (
        <FollowButton
          userId={user.id}
          isFollowing={user.isFollowing}
          isCurrentUser={false}
        />
      )}
    </div>
  );
}
