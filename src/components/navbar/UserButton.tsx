'use client';

import { resetCache } from '@/lib/actionUtils';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UserButtonProps {
  user: Session['user'];
}

const extractInitialFromName = (name: string) => {
  return name
    .split(' ')
    .map((splitName) => splitName.trim().toUpperCase()[0])
    .join('');
};

export default function UserButton({ user }: UserButtonProps) {
  const handleLogout = () => {
    signOut({ redirect: false });
    resetCache();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='bg-orange-300'>
          <AvatarFallback>{extractInitialFromName(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/users/${user.username}`}>Your profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/users/${user.username}/projects`}>Your projects</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant='ghost'
            size='sm'
            className='h-min w-full justify-start font-normal text-sm'
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
