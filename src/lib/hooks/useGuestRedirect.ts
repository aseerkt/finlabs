import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useGuestRedirect = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.data?.user) {
      router.replace(`/users/${session.data.user.username}`);
    }
  }, [session.data?.user]);
};

export default useGuestRedirect;
