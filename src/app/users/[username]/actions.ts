'use server';

import { checkAuthSession } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ProfileSchema } from './schemas';

export const toggleFollow = async (userId: number) => {
  const session = await checkAuthSession();

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: userId,
      },
    },
  });

  const transactions = [];

  if (follow) {
    transactions.push(
      prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: userId,
          },
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          followingsCount: { decrement: 1 },
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          followersCount: { decrement: 1 },
        },
        select: {
          username: true,
        },
      })
    );
  } else {
    transactions.push(
      prisma.follow.create({
        data: {
          followerId: session.user.id,
          followingId: userId,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          followingsCount: { increment: 1 },
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          followersCount: { increment: 1 },
        },
        select: {
          username: true,
        },
      })
    );
  }
  const results = await prisma.$transaction(transactions);
  revalidatePath(`/users/${(results[2] as { username: string }).username}`);
};

export const editProfile = async (payload: ProfileSchema) => {
  const session = await checkAuthSession();

  await prisma.user.update({ where: { id: session.user.id }, data: payload });
  revalidatePath(`/users/${session.user.username}`);
};
