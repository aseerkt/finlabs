import { TaskPriority } from '@prisma/client';

export const taskPriorityBgColors = {
  [TaskPriority.LOW]: 'bg-blue-500',
  [TaskPriority.MEDIUM]: 'bg-yellow-500',
  [TaskPriority.HIGH]: 'bg-red-500',
};

export const taskPriorityTextColors = {
  [TaskPriority.LOW]: 'text-blue-500',
  [TaskPriority.MEDIUM]: 'text-yellow-500',
  [TaskPriority.HIGH]: 'text-red-500',
};

export const TASK_ID_SEARCH_PARAM_KEY = 'task_id';


export const priorityOptions = [
  {
    label: 'Low',
    value: TaskPriority.LOW,
  },
  {
    label: 'Medium',
    value: TaskPriority.MEDIUM,
  },
  {
    label: 'High',
    value: TaskPriority.HIGH,
  },
];