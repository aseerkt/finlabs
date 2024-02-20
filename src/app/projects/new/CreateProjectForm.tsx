'use client';

import { InputField, RadioGroupField, TextAreaField } from '@/components/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toastUnknownError } from '@/components/ui/use-toast';
import { convertToGithubRepoName } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createProject } from './actions';
import { createProjectSchema } from './schema';

export default function CreateProjectForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      isPublic: 'true',
    },
    resolver: zodResolver(createProjectSchema),
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const session = useSession();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await createProject({
        ...values,
        name: values.name,
        isPublic: values.isPublic === 'true',
      });
      if (result?.id) {
        router.replace(
          `/users/${session.data!.user.username}/projects/${result.name}`
        );
      }
    } catch (error) {
      toastUnknownError(error);
    }
  });

  const projectName = convertToGithubRepoName(watch('name'));
  const isPublic = watch('isPublic') === 'true';

  const visibilityOptions = [
    { label: 'Public', value: 'true' },
    { label: 'Private', value: 'false' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <InputField
          label='Project name'
          name='name'
          control={control}
          autoFocus
        />
        {projectName && (
          <Alert variant='success' className='mb-4'>
            <AlertTitle>
              Your new project will be created as <b>{projectName}</b>
            </AlertTitle>
            <AlertDescription>
              The project name can only contain ASCII letters, digits, and the
              characters ., -, and _.
            </AlertDescription>
          </Alert>
        )}
        <TextAreaField
          label='Description'
          name='description'
          control={control}
          rows={5}
        />
        <RadioGroupField
          name='isPublic'
          control={control}
          label='Visibility'
          options={visibilityOptions}
          helperText={
            <span className='text-gray-500'>
              {isPublic
                ? 'Anyone on the internet can see this project. You choose who can write.'
                : 'You choose who can see and write to this project.'}
            </span>
          }
        />
        <Button className='mt-5' type='submit' disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
