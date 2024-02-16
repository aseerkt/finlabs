import { getAuthSesssion } from '@/lib/authUtils';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

interface RequestParams {
  taskId: string;
}

export async function GET(
  _request: Request,
  { params }: { params: RequestParams }
) {
  const session = await getAuthSesssion();

  const privateProjectReadWhere: Prisma.ProjectWhereInput['OR'] = session?.user
    ? [
        { authorId: session.user.id },
        { collaborators: { some: { userId: session.user.id } } },
      ]
    : [];

  const task = await prisma.task.findFirst({
    where: {
      id: Number(params.taskId),
      column: {
        project: {
          OR: [{ isPublic: true }, ...privateProjectReadWhere],
        },
      },
    },
    select: {
      id: true,
      title: true,
      priority: true,
      description: true,
      isActive: true,
      column: {
        select: {
          id: true,
          label: true,
          color: true,
        },
      },
    },
  });

  if (!task) {
    notFound();
  }

  return NextResponse.json(task);
}
