import { BoardData, Column } from './types';

export const getBoardDataFromColumns = (columns: Column[]) => {
  return columns.reduce<BoardData>(
    (prev, curr) => {
      const currentColumnTaskIds: number[] = [];
      const currentColumnTasks: BoardData['tasks'] = {};

      curr.tasks.forEach((task) => {
        currentColumnTaskIds.push(task.id);
        currentColumnTasks[task.id] = task;
      });

      return {
        columnIds: prev.columnIds.concat(curr.id),
        items: {
          ...prev.items,
          [curr.id]: currentColumnTaskIds,
        },
        columns: {
          ...prev.columns,
          [curr.id]: { ...curr, tasks: undefined },
        },
        tasks: {
          ...prev.tasks,
          ...currentColumnTasks,
        },
      };
    },
    {
      columnIds: [],
      items: {},
      columns: {},
      tasks: {},
    }
  );
};
