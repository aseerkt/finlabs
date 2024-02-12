import { CollaboratorRole, Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getAuthSesssion } from '../authUtils';
import prisma from '../prisma';

function getRoleFilter(role?: CollaboratorRole) {
  switch (role) {
    case CollaboratorRole.WRITE:
      return { in: [CollaboratorRole.WRITE, CollaboratorRole.READ] };
    case CollaboratorRole.ADMIN:
      return CollaboratorRole.ADMIN;
    default:
  }
}

function getProjectAccessFilter(
  userId?: number,
  role?: CollaboratorRole | 'AUTHOR'
): Prisma.ProjectWhereInput {
  const roleCheckFilter = [
    { authorId: userId },
    role === 'AUTHOR'
      ? {}
      : {
          collaborators: {
            some: {
              userId: userId,
              role: getRoleFilter(role),
            },
          },
        },
  ];
  return {
    OR: [
      { isPublic: true, OR: role === 'READ' ? undefined : roleCheckFilter },
      {
        isPublic: false,
        OR: roleCheckFilter,
      },
    ],
  };
}

export const fetchProject = cache(
  async (
    username: string,
    projectName: string,
    select?: Prisma.ProjectSelect
  ) => {
    const session = await getAuthSesssion();

    const filter = getProjectAccessFilter(session?.user.id, 'READ');

    return prisma.project.findFirst({
      where: {
        name: projectName,
        author: {
          username: username,
        },
        ...filter,
      },
      select: {
        id: true,
        isPublic: true,
        isActive: true,
        name: true,
        description: true,
        author: {
          select: {
            username: true,
            name: true,
          },
        },
        columns: {
          select: {
            id: true,
            label: true,
            color: true,
            description: true,
            position: true,
            tasks: {
              select: {
                id: true,
                columnId: true,
                title: true,
                priority: true,
                position: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }
);

export const fetchProjectsForUser = cache(async (username: string) => {
  const session = await getAuthSesssion();

  return prisma.project.findMany({
    where: {
      isPublic: session?.user.username === username ? undefined : true,
      OR: [
        { author: { username } },
        { collaborators: { some: { user: { username } } } },
      ],
    },
    select: {
      name: true,
      description: true,
      isActive: true,
      isPublic: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });
});

export const getProjectRole = cache(async (projectId: number) => {
  const session = await getAuthSesssion();

  const project = await prisma.project.findFirst({
    where: { id: projectId },
    select: {
      isPublic: true,
      isActive: true,
      authorId: true,
    },
  });

  if (!project) {
    notFound();
  }

  if (!session?.user.id && !project.isPublic) {
    notFound();
  }

  if (project.authorId === session?.user.id) {
    return 'AUTHOR' as const;
  }

  const collaborator = await prisma.collaborator.findFirst({
    where: {
      projectId,
      userId: session?.user.id,
    },
    select: {
      role: true,
    },
  });

  if (!collaborator) {
    if (project.isPublic) {
      return CollaboratorRole.READ;
    } else {
      notFound();
    }
  }

  return collaborator.role;
});
