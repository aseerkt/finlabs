'use client';

import { InputField, TextAreaField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createProject } from './actions';
import { createProjectSchema } from './schema';

export default function CreateProjectForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(createProjectSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createProject(values);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <InputField label='Project name' name='name' control={control} />
        <TextAreaField
          label='Description'
          name='description'
          control={control}
        />
        <Button type='submit' disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
