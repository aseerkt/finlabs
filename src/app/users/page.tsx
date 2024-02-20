import { Navbar } from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllUsers } from '@/lib/daos/users';
import Link from 'next/link';

export default async function UserListPage() {
  const users = await fetchAllUsers();

  return (
    <div className='flex flex-col'>
      <Navbar title='All users' />
      <ul className=' max-w-screen-xl mx-auto mt-3 p-3 grow grid grid-cols-3 gap-3'>
        {users.map((user) => (
          <li key={user.id}>
            <Card>
              <CardContent className='p-4'>
                <div>
                  <Link
                    href={`/users/${user.username}`}
                    className='font-semibold hover:underline'
                  >
                    {user.username}
                  </Link>{' '}
                  <span className='text-gray-500'>{user.name}</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
