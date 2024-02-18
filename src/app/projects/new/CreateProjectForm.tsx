'use client';

import { InputField, RadioGroupField, TextAreaField } from '@/components/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { convertToGithubRepoName } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
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

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createProject({
        ...values,
        name: convertToGithubRepoName(values.name),
        isPublic: values.isPublic === 'true',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
      });
    }
  });

  const projectName = convertToGithubRepoName(watch('name'));
  const isPublic = watch('isPublic') === 'true';

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <InputField label='Project name' name='name' control={control} />
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
          options={[
            { label: 'Public', value: 'true' },
            { label: 'Private', value: 'false' },
          ]}
          helperText={
            isPublic
              ? 'Anyone on the internet can see this project. You choose who can write.'
              : 'You choose who can see and write to this project.'
          }
        />
        <Button className='mt-5' type='submit' disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
