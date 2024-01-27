import { zRequiredString } from '@/lib/zodUtils';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: zRequiredString('Name is required'),
    username: zRequiredString('Username is required'),
    email: zRequiredString('Email is required').email({
      message: 'Invalid email address',
    }),
    password: zRequiredString('Password is required'),
    confirmPassword: zRequiredString('Confirm password is required'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Password mismatch',
        code: 'custom',
      });
    }
  });
