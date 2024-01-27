'use server';

import { getAuthSesssion } from '@/lib/authUtils';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { CreateProjectValues } from './schema';

export const createProject = async (values: CreateProjectValues) => {
  const session = await getAuthSesssion();
  if (!session) {
    throw new Error('Not Authenticated');
  }
  const project = await prisma.project.create({
    data: {
      name: values.name,
      description: values.description,
      authorId: session?.user.id,
      columns: {
        createMany: {
          data: [
            {
              label: 'Todo',
              color: 'BLUE',
            },
            {
              label: 'In Progress',
              color: 'PURPLE',
            },
            {
              label: 'Done',
              color: 'GREEN',
            },
          ],
        },
      },
    },
  });

  redirect(`/users/${session.user.username}/projects/${project.name}`);
};
