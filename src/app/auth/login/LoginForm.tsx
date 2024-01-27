'use client';

import { Form, InputField, SubmitButton } from '@/components/form';
import { toast } from '@/components/ui/use-toast';
import useGuestRedirect from '@/lib/hooks/useGuestRedirect';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { loginSchema } from './schema';

export default function LoginForm() {
  useGuestRedirect();

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const result = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (result?.ok) {
        toast({
          title: 'Welcome to Finlabs',
          description: 'Glad to have you back',
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
  };

  return (
    <Form
      initialValues={{ usernameOrEmail: '', password: '' }}
      onSubmit={handleSubmit}
      schema={loginSchema}
    >
      <InputField
        label='Username or Email'
        type='text'
        name='usernameOrEmail'
      />
      <InputField
        label='Password'
        type='password'
        name='password'
        autoComplete='password'
      />
      <SubmitButton>Sign in</SubmitButton>
    </Form>
  );
}
