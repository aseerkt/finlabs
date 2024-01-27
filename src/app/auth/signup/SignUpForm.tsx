'use client';

import { signUpSchema } from '@/app/auth/signup/schema';
import { Form, InputField, SubmitButton } from '@/components/form';
import { toast } from '@/components/ui/use-toast';
import useGuestRedirect from '@/lib/hooks/useGuestRedirect';
import { z } from 'zod';
import createUser from './action';

export default function SignUpForm() {
  useGuestRedirect();

  const handleSignUpAction = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const result = await createUser(values);
      if (result.errors) {
        toast({
          title: result.message,
          description: 'Please check your inputs',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Form
      className='flex flex-col'
      schema={signUpSchema}
      initialValues={initialValues}
      onSubmit={handleSignUpAction}
      noValidate
    >
      <InputField label='Full name' type='text' name='name' />
      <InputField
        label='Username'
        type='text'
        name='username'
        autoComplete='username'
      />
      <InputField label='Email' type='email' name='email' />
      <InputField
        label='Password'
        type='password'
        name='password'
        autoComplete='new-password'
      />
      <InputField
        label='Confirm Password'
        type='password'
        name='confirmPassword'
        autoComplete='new-password'
      />
      <SubmitButton>Sign up</SubmitButton>
    </Form>
  );
}
