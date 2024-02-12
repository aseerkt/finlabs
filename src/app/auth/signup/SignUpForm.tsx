'use client';

import { signUpSchema } from '@/app/auth/signup/schema';
import { InputField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import useGuestRedirect from '@/lib/hooks/useGuestRedirect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import createUser from './action';

export default function SignUpForm() {
  useGuestRedirect();

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleSignUpAction = handleSubmit(
    async (values: z.infer<typeof signUpSchema>) => {
      try {
        const result = await createUser(values);
        if (result?.message) {
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
    }
  );

  return (
    <Form {...form}>
      <form className='flex flex-col' onSubmit={handleSignUpAction} noValidate>
        <InputField
          label='Full name'
          type='text'
          name='name'
          control={control}
        />
        <InputField
          label='Username'
          type='text'
          name='username'
          control={control}
          autoComplete='username'
        />
        <InputField label='Email' type='email' name='email' control={control} />
        <InputField
          label='Password'
          type='password'
          name='password'
          control={control}
          autoComplete='new-password'
        />
        <InputField
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          control={control}
          autoComplete='new-password'
        />
        <Button type='submit' disabled={isSubmitting}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
