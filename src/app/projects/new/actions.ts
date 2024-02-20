'use server';

import { getAuthSesssion } from '@/lib/authUtils';
import prisma from '@/lib/prisma';
import { convertToGithubRepoName } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

    redirect(`/users/${session.user.username}/projects/${project.name}`);
  } catch (error) {
    console.log(error);
  }
};
