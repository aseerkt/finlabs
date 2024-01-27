import { zRequiredString } from '@/lib/zodUtils';
import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: zRequiredString('Username or Email is required'),
  password: zRequiredString('Password is required'),
});
