'use server';
import { getAuthSesssion } from '@/lib/authUtils';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type NavbarProps = {
  title: string;
};

const Navbar = async ({ title }: NavbarProps) => {
  const session = await getAuthSesssion();

  return (
    <div className='flex justify-between items-center px-6 py-3 h-20'>
      <div className='flex gap-3 items-center'>
        <Image src='/finlabs-logo.svg' alt='Finlabs' width={32} height={32} />
        <h3 className='font-bold text-lg'>{title}</h3>
      </div>
      <div className='flex gap-3 items-center'>
        {session?.user ? (
          <>
            <Link aria-label='add project' href='/projects/new'>
              <PlusCircleIcon />
            </Link>
          </>
        ) : (
          <>
            <Link href='/auth/login'>Login</Link>
            <Link href='/auth/signup'>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
