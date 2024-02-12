'use client';

import { InputField, TextAreaField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { editProject } from './actions';

interface EditProjectProps {
  project: {
    id: number;
    name: string;
    description: string | null;
  };
}

export default function EditProject({ project }: EditProjectProps) {
  const form = useForm({
    defaultValues: {
      id: project.id,
      name: project.name,
      description: project.description ?? '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await editProject(values);
      toast({
        title: 'Changes saved',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  });

  return (
    <Form {...form}>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <InputField name='name' control={form.control} label='Project name' />
        <TextAreaField
          name='description'
          control={form.control}
          label='Short description'
          placeholder='Add a short description about this project'
        />
        <Button
          type='submit'
          className='ml-auto'
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
