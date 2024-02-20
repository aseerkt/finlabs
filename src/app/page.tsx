import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className='min-h-screen flex flex-col bg-opacity-0'
      style={{
        backgroundImage: 'url("/finlabs-home.jpg")',
      }}
    >
      <Navbar title='Finlabs' />
      <div className='grow flex items-center justify-center'>
        <div className='h-full bg-gray-800 bg-opacity-30 shadow-md rounded-2xl  grid grid-cols-2 space-x-10 p-20 items-center max-w-screen-lg mx-auto'>
          <div className='text-balance'>
            <h1 className='text-pink-400 font-extrabold mb-4 text-5xl'>
              Finlabs
            </h1>{' '}
            <p className='text-3xl text-gray-300 font-semibold mb-5'>
              Streamline your projects with Finlabs - the flexible project
              management tool for modern teams
            </p>
            <Button size='lg' asChild>
              <Link href='/auth/login'>Get Started</Link>
            </Button>
          </div>
          <div className='flex grow justify-end items-center space-x-3 mt-3'>
            <Image
              src='/finlabs-home-illustration.svg'
              alt='Task management'
              width={400}
              height={300}
              className='animate-pulse'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
