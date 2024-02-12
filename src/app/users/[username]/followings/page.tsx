import { getAuthSesssion } from '@/lib/authUtils';
import { getFollowings } from '@/lib/daos/follows';
import { fetchUserByUsername } from '@/lib/daos/users';
import { EmptyFollowPlaceholder } from '../EmptyFollowPlaceholder';
import FollowList from '../FollowList';
import { UserPageProps } from '../page';

export default async function FollowingsPage({ params }: UserPageProps) {
  const user = await fetchUserByUsername(params.username);

  const followings = await getFollowings(user.id);

  if (!followings.length)
    return <EmptyFollowPlaceholder followType='following' />;

  const session = await getAuthSesssion();

  return <FollowList follows={followings} currentUserId={session?.user.id} />;
}
