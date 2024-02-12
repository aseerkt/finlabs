'use client';

import { InputField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { resetCache } from '@/lib/actionUtils';
import useGuestRedirect from '@/lib/hooks/useGuestRedirect';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from './schema';

export default function LoginForm() {
  useGuestRedirect();

  const form = useForm({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values: z.infer<typeof loginSchema>) => {
    try {
      const result = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (result?.ok) {
        resetCache();
        toast({
          title: 'Welcome to Finlabs',
          description: 'Glad to have you here',
          variant: 'success',
        });
      } else if (result?.error) {
        toast({
          title: 'Login failed',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again after some time',
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <InputField
          label='Username or Email'
          type='text'
          name='usernameOrEmail'
          control={control}
        />
        <InputField
          label='Password'
          type='password'
          name='password'
          autoComplete='password'
          control={control}
        />
        <Button type='submit' disabled={isSubmitting}>
          Sign in
        </Button>
      </form>
    </Form>
  );
}
