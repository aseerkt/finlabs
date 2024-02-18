'use server';

import { checkAuthSession, checkProjectAccess } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { TaskPriority } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { EditTaskPayload } from './types';

interface CreateTaskPayload {
  projectId: number;
  columnId: number;
  title: string;
  priority: TaskPriority;
  description: string;
  assigneeId?: number;
}

export const createTask = async ({
  projectId,
  columnId,
  title,
  priority,
  description,
  assigneeId,
}: CreateTaskPayload) => {
  const { project, session } = await checkProjectAccess(projectId, 'WRITE', {
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
      assigneeId,
      reporterId: session.user.id,
      // @ts-ignore
      position: project.columns[0].tasks.length,
    },
  });

  revalidatePath(`/users/${project.author.username}/projects/${project.name}`);

  return task;
};

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
    data: {
      ...payload,
      assignee: undefined,
      assigneeId: payload.assignee?.id,
    },
  });

  revalidatePath(
    `/users/${updatedTask.column.project.author.username}/projects/${updatedTask.column.project.name}`
  );

  return updatedTask;
};
