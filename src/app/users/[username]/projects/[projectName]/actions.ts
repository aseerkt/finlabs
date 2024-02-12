'use server';

import { getAuthSesssion } from '@/lib/authUtils';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CreateTaskPayload {
  projectName: string;
  columnId: number;
  title: string;
}

export const createTask = async ({
  projectName,
  columnId,
  title,
}: CreateTaskPayload) => {
  const session = await getAuthSesssion();

  if (!session?.user) {
    throw new Error('Not Authenticated');
  }

  const project = await prisma.project.findFirst({
    where: { name: projectName },
    select: {
      authorId: true,
      author: {
        select: {
          username: true,
        },
      },
      name: true,
      columns: {
        where: { id: columnId },
        select: {
          id: true,
          tasks: { orderBy: { position: 'asc' }, where: { isActive: true } },
        },
      },
    },
  });

  /**
   * if current session user is not the author
   * or the column does to belong to the project
   * forbid create task operation
   */
  if (project?.authorId !== session.user.id || project.columns.length === 0) {
    throw new Error('Not Authorized');
  }

  /**
   * TODO: allow invited contributors to create task
   */

  const task = await prisma.task.create({
    data: { columnId, title, position: project.columns[0].tasks.length },
  });

  revalidatePath(`/users/${project.author.username}/projects/${projectName}`);

  return task;
};
