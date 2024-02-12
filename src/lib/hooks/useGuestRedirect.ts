import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const useGuestRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user) {
      const callbackUrl = searchParams.get('callbackUrl');
      router.replace(callbackUrl ?? `/users/${session.data.user.username}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.user, router]);
};

export default useGuestRedirect;
