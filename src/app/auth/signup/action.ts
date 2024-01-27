'use server';

import { signUpSchema } from '@/app/auth/signup/schema';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default async function createUser(values: z.infer<typeof signUpSchema>) {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUserCount = await prisma.user.count({
    where: { OR: [{ email: values.email }, { username: values.username }] },
  });

  if (existingUserCount !== 0) {
    return {
      message: 'Email/Username already taken',
      errors: {
        email: ['Email already taken'],
        username: ['Username already taken'],
      },
    };
  }

  const hash = await bcrypt.hash(values.password, 10);

  await prisma.user.create({
    data: {
      name: values.name,
      email: values.email,
      username: values.username,
      password: hash,
    },
  });

  redirect('/auth/login');
}
