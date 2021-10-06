import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/shared/Avatar';
import Button from '@/shared/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <header className='w-screen h-16 bg-gray-800 shadow'>
        <nav className='container flex items-center h-full'>
          <Link href='/'>
            <a className='text-xl font-bold'>
              <span className='text-blue-700'>fin</span>labs
            </a>
          </Link>
          <div className='flex items-center ml-auto space-x-3'>
            {user ? (
              <>
                <Button isRound onClick={() => router.push('/new')}>
                  <FaPlus />
                </Button>
                <UserMenu>
                  <Avatar src={user.avatar} alt={user.username} />
                </UserMenu>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <a className='btn btn-outline'>login</a>
                </Link>
                <Link href='/register'>
                  <a className='btn'>register</a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className='flex h-16'></div>
    </>
  );
}

export default Navbar;