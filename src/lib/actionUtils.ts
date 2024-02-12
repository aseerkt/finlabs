'use server';

import { CollaboratorRole, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { getAuthSesssion } from './authUtils';
import prisma from './prisma';

export const resetCache = () => {
  revalidatePath('/', 'layout');
};

export const checkAuthSession = async () => {
  const session = await getAuthSesssion();

  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  return session;
};

const projectAccessRoles = {
  ...CollaboratorRole,
  AUTHOR: 'AUTHOR',
};

type ProjectAccessRole = keyof typeof projectAccessRoles;

const rolePrecedence: Record<ProjectAccessRole, number> = {
  READ: 0,
  WRITE: 1,
  ADMIN: 2,
  AUTHOR: 3,
};

export const checkProjectAccess = async (
  projectId: number,
  role: ProjectAccessRole = 'AUTHOR',
  select?: Prisma.ProjectSelect
) => {
  const session = await checkAuthSession();

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
    select: {
      ...select,
      id: true,
      authorId: true,
      isPublic: true,
    },
  });

  if (!project) {
    notFound();
  }

  const errorMessage = "Not authorized: You don't have enough previliage";

  if (project.authorId !== session.user.id) {
    if (role === 'AUTHOR') {
      throw new Error(errorMessage);
    }
    const collab = await prisma.collaborator.findFirst({
      where: { userId: session.user.id, projectId },
      select: { role: true },
    });

    if (!collab || rolePrecedence[collab.role] < rolePrecedence[role]) {
      throw new Error(errorMessage);
    }
  }

  return { project, session };
};
