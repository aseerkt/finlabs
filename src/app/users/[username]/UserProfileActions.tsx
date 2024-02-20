'use client';

import EditProfileModal from './EditProfileModal';
import FollowButton from './FollowButton';
import { UserProfileSectionProps } from './UserProfileSection';

export default function UserProfileActions({
  user,
  isCurrentUser,
}: UserProfileSectionProps) {
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
