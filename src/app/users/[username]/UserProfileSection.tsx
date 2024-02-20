import { Card, CardContent } from '@/components/ui/card';
import { LinkIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UserProfileActions from './UserProfileActions';

export interface UserProfileSectionProps {
  user: {
    id: number;
    username: string;
    name: string;
    website: string | null;
    location: string | null;
    followersCount: number;
    followingsCount: number;
    isFollowing: boolean;
  };
  isCurrentUser: boolean;
  isLoggedIn: boolean;
}

export default function UserProfileSection({
  user,
  isCurrentUser,
  isLoggedIn,
}: UserProfileSectionProps) {
  return (
    <Card className='bg-transparent'>
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
            <p className='text-3xl font-bold mb-2'>{user?.name}</p>
            <p className='text-xl mb-3'>{user?.username}</p>
          </div>
        </div>
        {isLoggedIn && (
          <UserProfileActions user={user} isCurrentUser={isCurrentUser} />
        )}
        <div className='flex my-3 items-center space-x-3'>
          <UsersIcon className='-mr-1' size={16} />
          <span className='flex items-center '>
            <b className='font-semibold mr-1'>{user.followersCount}</b>
            <Link
              href={`/users/${user.username}/followers`}
              className='text-sm text-gray-500'
            >
              followers
            </Link>
          </span>
          <span className='font-bold'>·</span>
          <span className='flex items-center '>
            <b className='font-semibold mr-1'>{user.followingsCount}</b>
            <Link
              href={`/users/${user.username}/followings`}
              className='text-sm text-gray-500'
            >
              followings
            </Link>
          </span>
        </div>
        <div className='space-y-3 text-sm'>
          {user?.website && (
            <div className='flex space-x-2 items-center'>
              <LinkIcon size={16} />{' '}
              <a
                className='hover:underline'
                href={user.website}
                rel='noreferrer'
                target='_blank'
              >
                {user.website}
              </a>
            </div>
          )}
          {user?.location && (
            <div className='flex space-x-2 items-center'>
              <MapPinIcon size={16} /> <span>{user.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
