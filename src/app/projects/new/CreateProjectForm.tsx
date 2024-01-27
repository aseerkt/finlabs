'use client';

import { Form, InputField, SubmitButton } from '@/components/form';
import TextAreaField from '@/components/form/TextAreadField';
import { toast } from '@/components/ui/use-toast';
import { createProject } from './actions';
import { CreateProjectValues, createProjectSchema } from './schema';

export default function CreateProjectForm() {
  const handleSubmit = async (values: CreateProjectValues) => {
    try {
      await createProject(values);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form
      initialValues={{ name: '', description: '' }}
      onSubmit={handleSubmit}
      schema={createProjectSchema}
    >
      <InputField label='Project name' name='name' />
      <TextAreaField label='Description' name='description' />
      <SubmitButton>Create</SubmitButton>
    </Form>
  );
}
