import { zRequiredString } from '@/lib/zodUtils';
import { z } from 'zod';

export const createProjectSchema = z.object({
  name: zRequiredString('Project name is required'),
  description: z.string(),
});

export type CreateProjectValues = z.infer<typeof createProjectSchema>;
