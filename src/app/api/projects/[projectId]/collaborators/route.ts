import prisma from '@/lib/prisma';
import { CollaboratorRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface ProjectParams {
  projectId: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: ProjectParams }
) => {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') as CollaboratorRole | null;
  const username = searchParams.get('username');

  const collaborators = await prisma.collaborator.findMany({
    where: {
      projectId: Number(params.projectId),
      role: role ?? undefined,
      ...(username
        ? { user: { username: { contains: username } } }
        : undefined),
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json({
    users: collaborators.map((collab) => ({
      role: collab.role,
      ...collab.user,
    })),
  });
};
