'use server';

import { cache } from 'react';
import { getAuthSesssion } from '../authUtils';
import prisma from '../prisma';

const getSessionUserFollowSelect = (sessionUserId?: number) =>
  sessionUserId
    ? {
        followings: {
          where: { followerId: sessionUserId },
          select: { followerId: true },
        },
      }
    : undefined;

export const getFollowers = cache(async (userId: number) => {
  const session = await getAuthSesssion();

  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          ...getSessionUserFollowSelect(session?.user.id),
        },
      },
    },
  });

  return followers.map((follow) => ({
    ...follow.follower,
    isFollowing: Boolean(follow.follower.followings.length),
    followings: undefined,
  }));
});

export const getFollowings = cache(async (userId: number) => {
  const session = await getAuthSesssion();
  const followings = await prisma.follow.findMany({
    where: { followerId: userId },
    select: {
      following: {
        select: {
          id: true,
          name: true,
          username: true,
          ...getSessionUserFollowSelect(session?.user.id),
        },
      },
    },
  });

  return followings.map((follow) => ({
    ...follow.following,
    isFollowing: Boolean(follow.following.followings.length),
    followings: undefined,
  }));
});
