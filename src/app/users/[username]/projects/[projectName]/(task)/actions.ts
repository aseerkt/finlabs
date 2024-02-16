'use server';

import { checkAuthSession } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { EditTaskPayload } from './types';

export const editTask = async (taskId: number, payload: EditTaskPayload) => {
  const session = await checkAuthSession();

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
      column: {
        project: {
          OR: [
            { authorId: session.user.id },
            {
              collaborators: {
                some: {
                  userId: session.user.id,
                  role: { in: ['WRITE', 'ADMIN'] },
                },
              },
            },
          ],
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      priority: true,
      column: {
        select: {
          id: true,
          label: true,
          color: true,
          project: {
            select: {
              name: true,
              author: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      },
    },
    data: payload,
  });

  revalidatePath(
    `/users/${updatedTask.column.project.author.username}/projects/${updatedTask.column.project.name}`
  );

  return updatedTask;
};
