import { cache } from 'react';
import prisma from '../prisma';

export const getTaskById = cache((taskId: number) => {
  return prisma.task.findUnique({
    where: { id: taskId },
    select: {
      id: true,
      title: true,
      description: true,
      assignee: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      column: {
        select: {
          id: true,
          label: true,
          color: true,
        },
      },
    },
  });
});
