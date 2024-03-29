import { zRequiredString } from '@/lib/zodUtils';
import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

export const addTaskSchema = z.object({
  title: zRequiredString('Title is required'),
  priority: z.nativeEnum(TaskPriority),
  description: z.string(),
  assignee: z.object({ id: z.number(), username: z.string() }).optional(),
});

export type AddTaskSchema = z.infer<typeof addTaskSchema>;
