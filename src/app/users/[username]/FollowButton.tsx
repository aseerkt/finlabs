'use client';

import { Button } from '@/components/ui/button';
import { toggleFollow } from './actions';

interface FollowButtonProps {
  userId: number;
  isCurrentUser: boolean;
  isFollowing: boolean;
}

export default function FollowButton({
  userId,
  isCurrentUser,
  isFollowing,
}: FollowButtonProps) {
  return (
    <Button
      variant='outline'
      onClick={() => toggleFollow(userId)}
      disabled={isCurrentUser}
    >
      {isCurrentUser ? 'You' : isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
