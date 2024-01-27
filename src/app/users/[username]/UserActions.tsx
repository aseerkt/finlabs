'use client';

import { Button } from '@/components/ui/button';

interface UserActionsProps {
  isCurrentUser: boolean;
}

export default function UserActions({ isCurrentUser }: UserActionsProps) {
  return (
    <div className='w-full'>
      {isCurrentUser ? (
        <Button variant='outline'>Edit Profile</Button>
      ) : (
        <Button variant='outline'>Follow</Button>
      )}
    </div>
  );
}
