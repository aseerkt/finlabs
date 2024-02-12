'use client';
import { PlusCircleIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import UserButton from './UserButton';

type NavbarProps = {
  title: React.ReactNode;
};

export default function Navbar({ title }: NavbarProps) {
  const session = useSession();

  return (
    <div className='flex justify-between items-center px-6 py-3 h-20 shadow-sm border-b bg-cyan-50'>
      <div className='flex gap-3 items-center'>
        <Link aria-label='home-link' href='/'>
          <Image src='/finlabs-logo.svg' alt='Finlabs' width={32} height={32} />
        </Link>
        <h3 className='font-semibold'>{title}</h3>
      </div>
      <div className='flex gap-3 items-center'>
        {session?.data?.user ? (
          <>
            <Link
              aria-label='add project'
              title='New project'
              href='/projects/new'
            >
              <PlusCircleIcon />
            </Link>
            <UserButton user={session.data.user} />
          </>
        ) : (
          <>
            <Button asChild>
              <Link href='/auth/login'>Login</Link>
            </Button>
            <Button variant='outline'>
              <Link href='/auth/signup'>Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
