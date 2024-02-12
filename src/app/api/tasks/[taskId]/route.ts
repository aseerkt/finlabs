import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

interface RequestParams {
  taskId: string;
}

export async function GET(
  _request: Request,
  { params }: { params: RequestParams }
) {
  const task = await prisma.task.findFirst({
    where: { id: Number(params.taskId) },
  });

  if (!task) {
    notFound();
  }

  NextResponse.json(task);
}
