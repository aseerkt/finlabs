import { Card, CardContent } from '@/components/ui/card';
import { User } from '@prisma/client';
import { LinkIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import UserActions from './UserActions';

interface UserProfileSectionProps {
  user: Omit<User, 'createdAt' | 'password' | 'updatedAt' | 'email'>;
  isCurrentUser: boolean;
}

export default function UserProfileSection({
  user,
  isCurrentUser = false,
}: UserProfileSectionProps) {
  return (
    <Card className='w-[296px] bg-transparent'>
      <CardContent className='pt-6'>
        <div className='flex md:flex-col gap-3 md:gap-6'>
          <Image
            src='/character.png'
            alt='avatar'
            height={296}
            width={296}
            className='w-20 h-20 md:w-[296px] md:h-[296px] shadow-md  object-cover object-center rounded-full'
          />
          <div>
            <p className='text-3xl font-bold mb-2'>{user.name}</p>
            <p className='text-xl mb-3'>{user.username}</p>
          </div>
        </div>
        <UserActions isCurrentUser={isCurrentUser} />
        <div>
          {user.website && (
            <p>
              <LinkIcon />{' '}
              <a href={user.website} rel='noreferrer' target='_blank'>
                {user.website}
              </a>
            </p>
          )}
          {user.location && (
            <p>
              <MapPinIcon /> <span>{user.location}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
