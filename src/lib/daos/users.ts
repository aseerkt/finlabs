import { cache } from 'react';
import prisma from '../prisma';

export const fetchUserByUsername = cache((username: string) => {
  return prisma.user.findFirst({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      followersCount: true,
      followingsCount: true,
      location: true,
      website: true,
    },
  });
});
