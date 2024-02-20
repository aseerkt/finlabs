import { Card } from '@/components/ui/card';
import { UsersIcon } from 'lucide-react';

interface EmptyFollowPlaceholderProps {
  followType: 'following' | 'follower';
}

export const EmptyFollowPlaceholder = ({
  followType,
}: EmptyFollowPlaceholderProps) => {
  return (
    <Card className='py-16 px-6 flex flex-col gap-4 grow items-center justify-center text-center'>
      <UsersIcon size={56} color='gray' />
      <h3 className='text-lg font-bold'>No {followType}s yet </h3>
    </Card>
  );
};
