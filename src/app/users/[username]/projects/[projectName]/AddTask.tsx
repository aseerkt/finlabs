'use client';

import { InputField } from '@/components/form';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createTask } from './actions';
import { ProjectPageParams } from './types';

interface AddTaskProps {
  columnId: number;
}

export default function AddTask({ columnId }: AddTaskProps) {
  const form = useForm({ defaultValues: { title: '' } });
  const params = useParams<ProjectPageParams>();
  const session = useSession();

  if (!session) return null;

  const handleAddTask = form.handleSubmit(async (values) => {
    try {
      await createTask({
        projectName: params.projectName,
        columnId,
        title: values.title,
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Unable to add task',
        description: (error as Error).message,
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleAddTask}>
        <InputField
          name='title'
          control={form.control}
          placeholder='Add item'
          autoFocus
        />
      </form>
    </Form>
  );
}
