import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { getAuthSesssion } from '@/lib/authUtils';
import Link from 'next/link';

export default async function NotFound() {
  const session = await getAuthSesssion();
  return (
    <div className='h-screen flex flex-col'>
      <Navbar title='Finlabs' />
      <div className='flex flex-col justify-center items-center grow'>
        <h1 className='font-extrabold text-3xl mb-5'>Page Not Found - 404</h1>
        <Button size='lg' asChild>
          <Link href={session?.user ? `/users/${session.user.username}` : '/'}>
            Go home
          </Link>
        </Button>
      </div>
    </div>
  );
}
