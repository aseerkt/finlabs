import { cache } from 'react';
import prisma from '../prisma';

export const fetchCollaborators = cache(async (projectId: number) => {
  const collaborators = await prisma.collaborator.findMany({
    where: {
      projectId,
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
  });

  return collaborators.map((collaborator) => ({
    ...collaborator.user,
    role: collaborator.role,
  }));
});
