'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EmptyProjectsPlaceHolder() {
  const session = useSession();
  const params = useParams<{ username: string }>();

  if (
    session.status === 'unauthenticated' ||
    session.data?.user.username !== params.username
  )
    return null;

  return (
    <Button asChild>
      <Link href='/projects/new'>Create project</Link>
    </Button>
  );
}
