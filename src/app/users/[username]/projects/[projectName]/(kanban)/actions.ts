'use server';

import { checkProjectAccess } from '@/lib/actionUtils';
import prisma from '@/lib/prisma';
import { arrayMove } from '@/lib/utils';

interface ReorderColumnsPayload {
  projectId: number;
  sourceColumnId: number;
  position: number;
}

export const reorderColumns = async (payload: ReorderColumnsPayload) => {
  await checkProjectAccess(payload.projectId, 'WRITE');

  const columns = await prisma.column.findMany({
    where: { projectId: payload.projectId },
    select: {
      id: true,
    },
    orderBy: {
      position: 'asc',
    },
  });

  const sourceColumnPosition = columns.findIndex(
    (column) => column.id === payload.sourceColumnId
  );

  if (sourceColumnPosition === -1) {
    throw new Error('Invalid source column id');
  }

  const destinationPosition =
    payload.position > columns.length - 1
      ? columns.length - 1
      : payload.position;

  if (sourceColumnPosition === destinationPosition) {
    throw new Error('Source and destination of column is same');
  }

  const reorderedColumns = arrayMove(
    columns,
    sourceColumnPosition,
    destinationPosition
  );

  const sliceArgs =
    sourceColumnPosition > destinationPosition
      ? { start: destinationPosition, end: sourceColumnPosition + 1 }
      : { start: sourceColumnPosition, end: destinationPosition + 1 };

  await prisma.$transaction(
    reorderedColumns
      .slice(sliceArgs.start, sliceArgs.end)
      .map((column, index) =>
        prisma.column.update({
          where: { id: column.id },
          data: { position: index },
        })
      )
  );
};

interface ReorderTasksPayload {
  projectId: number;
  columnId: number;
  sourceTaskId: number;
  position: number;
}

export const reorderTasksWithinColumn = async (
  payload: ReorderTasksPayload
) => {
  await checkProjectAccess(payload.projectId, 'WRITE');

  const tasks = await prisma.task.findMany({
    where: { columnId: payload.columnId },
    select: {
      id: true,
    },
    orderBy: {
      position: 'asc',
    },
  });

  const sourceTaskPosition = tasks.findIndex(
    (task) => task.id === payload.sourceTaskId
  );

  if (sourceTaskPosition === -1) {
    throw new Error('Invalid source column id');
  }

  const destinationPosition =
    payload.position > tasks.length - 1 ? tasks.length - 1 : payload.position;

  if (sourceTaskPosition === destinationPosition) {
    throw new Error('Source and destination of task is same');
  }

  const reorderedTasks = arrayMove(
    tasks,
    sourceTaskPosition,
    destinationPosition
  );

  const sliceArgs =
    sourceTaskPosition > destinationPosition
      ? { start: destinationPosition, end: sourceTaskPosition + 1 }
      : { start: sourceTaskPosition, end: destinationPosition + 1 };

  await prisma.$transaction(
    reorderedTasks.slice(sliceArgs.start, sliceArgs.end).map((task, index) =>
      prisma.task.update({
        where: { id: task.id },
        data: { position: index },
      })
    )
  );
};

interface MoveTaskPayload {
  projectId: number;
  taskId: number;
  sourceColumnId: number;
  destinationColumnId: number;
  position: number;
}

export const moveTaskBetweenColumns = async (payload: MoveTaskPayload) => {
  await checkProjectAccess(payload.projectId, 'WRITE');

  const columns = await prisma.column.findMany({
    where: {
      id: { in: [payload.sourceColumnId, payload.destinationColumnId] },
      projectId: payload.projectId,
    },
    include: {
      tasks: {
        select: {
          id: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (columns.length !== 2) {
    throw new Error('Source/Destination column does not exist');
  }

  const sourceColumn =
    columns[columns[0].id === payload.sourceColumnId ? 0 : 1];
  const destinationColumn =
    columns[columns[0].id === payload.destinationColumnId ? 0 : 1];

  const sourceTaskPosition = sourceColumn.tasks.findIndex(
    (task) => task.id === payload.taskId
  );

  if (sourceTaskPosition === -1) {
    throw new Error('Task does not belong to source column');
  }

  const taskTransactionUpdates = [];

  // if source task is not at the end of source column
  if (sourceTaskPosition !== sourceColumn.tasks.length - 1) {
    // change order of tasks in source column
    sourceColumn.tasks.slice(sourceTaskPosition + 1).forEach((task) => {
      taskTransactionUpdates.push(
        prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            position: { decrement: 1 },
          },
          select: {
            id: true,
          },
        })
      );
    });
  }

  if (payload.position <= destinationColumn.tasks.length - 1) {
    // change order tasks in
    destinationColumn.tasks.slice(payload.position).forEach((task) => {
      taskTransactionUpdates.push(
        prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            position: { increment: 1 },
          },
          select: {
            id: true,
          },
        })
      );
    });

    taskTransactionUpdates.push(
      prisma.task.update({
        where: { id: payload.taskId },
        data: {
          position: payload.position,
          columnId: payload.destinationColumnId,
        },
        select: {
          id: true,
        },
      })
    );
  } else {
    // add task at the end of the column if exceeds the columns tasks length
    taskTransactionUpdates.push(
      prisma.task.update({
        where: { id: payload.taskId },
        data: {
          position: destinationColumn.tasks.length,
          columnId: payload.destinationColumnId,
        },
        select: {
          id: true,
        },
      })
    );
  }

  await prisma.$transaction(taskTransactionUpdates);
};
