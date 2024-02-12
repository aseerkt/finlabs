'use server';

import { checkProjectAccess } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const toggleProjectVisibility = async (projectId: number) => {
  const { project, session } = await checkProjectAccess(projectId, 'AUTHOR', {
    isPublic: true,
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      isPublic: {
        set: !project.isPublic,
      },
    },
  });
  revalidatePath(`/users/${session.user.username}`);
};

export const toggleProjectOpenness = async (projectId: number) => {
  const { session, project } = await checkProjectAccess(projectId, 'AUTHOR', {
    isActive: true,
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      isActive: {
        set: !project.isActive,
      },
    },
  });
  revalidatePath(`/users/${session.user.username}`);
};

export const deleteProjet = async (projectId: number) => {
  const { session } = await checkProjectAccess(projectId, 'AUTHOR');
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath(`/users/${session.user.username}`);
  redirect(`/users/${session.user.username}`);
};

interface EditProjectPayload {
  id: number;
  name: string;
  description: string;
}

export const editProject = async (payload: EditProjectPayload) => {
  const { session } = await checkProjectAccess(payload.id, 'AUTHOR');

  await prisma.project.update({
    where: { id: payload.id },
    data: { name: payload.name, description: payload.description },
  });
  revalidatePath(`/users/${session.user.username}`);
  redirect(`/users/${session.user.username}/projects/${payload.name}/settings`);
};
