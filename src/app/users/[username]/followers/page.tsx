import { getAuthSesssion } from '@/lib/authUtils';
import { getFollowers } from '@/lib/daos/follows';
import { fetchUserByUsername } from '@/lib/daos/users';
import { EmptyFollowPlaceholder } from '../EmptyFollowPlaceholder';
import FollowList from '../FollowList';
import { UserPageProps } from '../page';

export default async function FollowersPage({ params }: UserPageProps) {
  const user = await fetchUserByUsername(params.username);

  const followers = await getFollowers(user.id);

  if (!followers.length)
    return <EmptyFollowPlaceholder followType='follower' />;

  const session = await getAuthSesssion();

  return <FollowList follows={followers} currentUserId={session?.user.id} />;
}
