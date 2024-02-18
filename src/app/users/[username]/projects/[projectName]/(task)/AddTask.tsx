'use client';

import { InputField, MdEditorField, SelectField } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskPriority } from '@prisma/client';
import { DialogClose } from '@radix-ui/react-dialog';
import { PlusCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { priorityOptions, taskPriorityBgColors } from '../constants';
import { AddTaskSchema, addTaskSchema } from '../schemas';
import { AssigneeAutocomplete } from './AssigneeAutocomplete';
import { createTask } from './actions';

interface AddTaskProps {
  projectId: number;
  columnId?: number;
  onClose: () => void;
}

export default function AddTask({
  projectId,
  columnId,
  onClose,
}: AddTaskProps) {
  const form = useForm<AddTaskSchema>({
    defaultValues: {
      title: '',
      priority: TaskPriority.LOW,
      description: '',
    },
    disabled: !columnId,
    resolver: zodResolver(addTaskSchema),
  });

  const handleAddTask = form.handleSubmit(async (values) => {
    try {
      await createTask({
        projectId,
        columnId: columnId!,
        ...values,
        assigneeId: values.assignee?.id,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Unable to add task',
        description: (error as Error).message,
      });
    }
  });

  return (
    <Dialog open={Boolean(columnId)} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id='add-edit-task-form'
            className='mt-3'
            onSubmit={handleAddTask}
          >
            <InputField
              name='title'
              label='Title'
              control={form.control}
              autoFocus
            />
            <SelectField
              name='priority'
              control={form.control}
              label='Priority'
              options={priorityOptions}
              optionKey='value'
              getOptionLabel={PriorityOption}
              getOptionValue={(option) => option.value}
              getCurrentOptionDisplay={(option) =>
                option?.label && <PriorityOption {...option} />
              }
            />
            <MdEditorField
              name='description'
              control={form.control}
              label='Short description'
            />
            <AssigneeAutocomplete
              name='assignee'
              control={form.control}
              projectId={projectId}
              label='Assignee'
            />
          </form>
          <DialogFooter className='justify-end'>
            <DialogClose asChild>
              <Button variant='ghost'>Cancel</Button>
            </DialogClose>
            <Button
              className='gap-2'
              form='add-edit-task-form'
              disabled={form.formState.isSubmitting}
              type='submit'
            >
              <PlusCircleIcon size={16} />
              Add
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface PriorityOptionsProps {
  label: string;
  value: TaskPriority;
}

export const PriorityOption = ({ label, value }: PriorityOptionsProps) => (
  <div className='flex items-center'>
    <span
      aria-label={`task-priority-color-${label}-${value}`}
      className={cn(
        'inline-block rounded-sm h-3 w-3 mr-2',
        taskPriorityBgColors[value]
      )}
    ></span>
    {label}
  </div>
);
