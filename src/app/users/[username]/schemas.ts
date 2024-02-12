import { zRequiredString } from '@/lib/zodUtils';
import { z } from 'zod';

export const profileSchema = z.object({
  name: zRequiredString('Name is required'),
  location: z.string(),
  website: z.string().url('Invalid URL'),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
