import { cache } from 'react';
import prisma from '../prisma';

export const getProjectByName = cache(
  (username: string, projectName: string) => {
    return prisma.project.findFirst({
      where: {
        name: projectName,
        author: {
          username: username,
        },
      },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
        columns: {
          select: {
            label: true,
            color: true,
          },
        },
      },
    });
  }
);
