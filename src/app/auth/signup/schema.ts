import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }),
    username: z.string({ required_error: 'Username is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
    confirmPassword: z.string({
      required_error: 'Confirm password is required',
    }),
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
