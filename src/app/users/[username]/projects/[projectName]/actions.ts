'use server';

import { checkProjectAccess } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { TaskPriority } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface CreateTaskPayload {
  projectId: number;
  columnId: number;
  title: string;
  priority: TaskPriority;
  description: string;
}

export const createTask = async ({
  projectId,
  columnId,
  title,
  priority,
  description,
}: CreateTaskPayload) => {
  const { project } = await checkProjectAccess(projectId, 'WRITE', {
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
  });

  const task = await prisma.task.create({
    data: {
      columnId,
      title,
      priority,
      description,
      // @ts-ignore
      position: project.columns[0].tasks.length,
    },
  });

  revalidatePath(`/users/${project.author.username}/projects/${project.name}`);

  return task;
};
