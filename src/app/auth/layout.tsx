import { Card } from '@/components/ui/card';
import { getAuthSesssion } from '@/lib/authUtils';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSesssion();

  if (session?.user) {
    redirect(`/users/${session.user.username}`);
  }

  return <Card className='mx-auto mt-10 max-w-[500px] w-full'>{children}</Card>;
}
