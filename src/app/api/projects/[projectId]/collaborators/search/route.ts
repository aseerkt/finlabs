import { checkAuthSession } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface ProjectParams {
  projectId: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: ProjectParams }
) => {
  const session = await checkAuthSession();
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('u');
  const limit = searchParams.has('limit') ? +searchParams.get('limit')! : 5;

  if (!term) return NextResponse.json({ users: [] });

  const users = await prisma.user.findMany({
    take: limit,
    where: {
      id: { not: session.user.id },
      username: { contains: term },
      collaborators: {
        none: {
          projectId: Number(params.projectId),
        },
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });

  return NextResponse.json({ users });
};
