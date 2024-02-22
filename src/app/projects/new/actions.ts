'use server';

import { getAuthSesssion } from '@/lib/authUtils';
import prisma from '@/lib/prisma';
import { convertToGithubRepoName } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface CreateProjectPayload {
  name: string;
  description: string;
  isPublic: boolean;
}

export const createProject = async (values: CreateProjectPayload) => {
  const session = await getAuthSesssion();
  if (!session) {
    throw new Error('Not Authenticated');
  }

  const projectName = convertToGithubRepoName(values.name);

  try {
    const project = await prisma.project.create({
      data: {
        name: projectName,
        description: values.description,
        authorId: session?.user.id,
        isPublic: values.isPublic,
        columns: {
          createMany: {
            data: [
              {
                label: 'Todo',
                color: 'BLUE',
                description: "This item hasn't been started",
                position: 0,
              },
              {
                label: 'In Progress',
                color: 'PURPLE',
                description: 'This is actively being worked on',
                position: 1,
              },
              {
                label: 'Done',
                color: 'GREEN',
                description: 'This has been completed',
                position: 2,
              },
            ],
          },
        },
      },
    });

    revalidatePath(`/users/${session.user.username}/projects`);
    return project;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw Error('A project with the same name already exists');
      }
    }
  }
};
