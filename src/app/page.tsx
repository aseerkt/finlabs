import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className='min-h-screen bg-opacity-0'
      style={{
        backgroundImage: 'url("/finlabs-home.jpg")',
      }}
    >
      <Navbar title='Finlabs' />
      <div className='h-full bg-cyan-50 rounded-2xl bg-opacity-20 flex flex-col px-20 mt-10 py-40 items-center max-w-screen-lg mx-auto justify-center'>
        <div className='text-4xl font-bold max-w-[700px] text-balance mb-4 text-center'>
          <h1 className='text-pink-400 font-extrabold mb-4'>Finlabs</h1>{' '}
          <span className='text-gray-300 font-semibold'>
            Supply project management tools that adapt to your team alongside
            supercharged collaboration
          </span>
        </div>
        <Button size='lg' asChild>
          <Link href='/auth/login'>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
