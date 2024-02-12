import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getAuthSesssion } from '../authUtils';
import prisma from '../prisma';

export const fetchUserByUsername = cache(
  async (username: string, checkIsFollowing = false) => {
    const session = await getAuthSesssion();
    const user = await prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        followersCount: true,
        followingsCount: true,
        location: true,
        website: true,
        ...(checkIsFollowing && session?.user.id
          ? {
              followings: {
                where: { followerId: session.user.id },
                select: { followerId: true },
              },
            }
          : undefined),
      },
    });

    if (!user) {
      notFound();
    }

    return { ...user, isFollowing: Boolean(user.followings?.length) };
  }
);

export const fetchAllUsers = cache(() => {
  return prisma.user.findMany({
    select: { id: true, username: true, name: true },
  });
});
