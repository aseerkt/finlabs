import { TaskPriority } from '@prisma/client';
import { RefObject } from 'react';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
}

export interface Column {
  id: number;
  color: string;
  label: string;
  description: string | null;
  tasks: Task[];
}

export interface BoardData {
  columnIds: number[];
  items: Record<string, number[]>;
  columns: Record<string, Column & { ref: RefObject<HTMLDivElement> }>;
  tasks: Record<string, Task>;
}

export type ProjectPageParams = {
  username: string;
  projectName: string;
};
