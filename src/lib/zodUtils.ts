import { z } from 'zod';

export const zRequiredString = (error: string) =>
  z.string({ required_error: error }).trim().min(1, { message: error });
