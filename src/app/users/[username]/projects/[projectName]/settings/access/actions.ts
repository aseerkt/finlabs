'use server';

import { checkProjectAccess } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { CollaboratorRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const revokeAccess = async (userIds: number[], projectId: number) => {
  const { project } = await checkProjectAccess(projectId, 'ADMIN', {
    name: true,
    author: {
      select: {
        username: true,
      },
    },
  });
  await prisma.collaborator.deleteMany({
    where: { projectId, userId: { in: userIds } },
  });
  revalidatePath(
    `/users/${project.author.username}/projects/${project.name}/settings/access`
  );
  revalidatePath(`/api/projects/${projectId}/collaborators/search`);
};

export const inviteUser = async (
  userIds: number[],
  projectId: number,
  role: CollaboratorRole
) => {
  const { project } = await checkProjectAccess(projectId, 'ADMIN', {
    name: true,
    author: {
      select: {
        username: true,
      },
    },
  });
  // TODO: send email

  await prisma.collaborator.createMany({
    data: userIds.map((userId) => ({
      projectId,
      userId,
      role,
    })),
  });
  revalidatePath(
    `/users/${project.author.username}/projects/${project.name}/settings/access`
  );
};

export const changeRole = async (
  userId: number,
  projectId: number,
  role: CollaboratorRole
) => {
  const { project } = await checkProjectAccess(projectId, 'ADMIN', {
    name: true,
    author: {
      select: {
        username: true,
      },
    },
  });
  await prisma.collaborator.update({
    where: { projectId_userId: { userId, projectId } },
    data: {
      role,
    },
  });
  revalidatePath(
    `/users/${project.author.username}/projects/${project.name}/settings/access`
  );
};
