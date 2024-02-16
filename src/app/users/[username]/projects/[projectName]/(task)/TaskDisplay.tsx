import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { cn, fetcher } from '@/lib/utils';
import { Prisma, TaskPriority } from '@prisma/client';
import { DialogTitle } from '@radix-ui/react-dialog';
import MDEditor from '@uiw/react-md-editor';
import { capitalize } from 'lodash';
import { useState } from 'react';
import useSWR from 'swr';
import { PriorityOption } from '../AddTask';
import { priorityOptions } from '../constants';
import EditTaskDescription from './EditTaskDescription';
import EditTaskTitle from './EditTaskTitle';
import TaskSkeleton from './TaskSkeleton';
import { editTask } from './actions';
import { columnBadgeClassNames } from './constants';
import { EditTaskPayload } from './types';

interface TaskDisplayProps {
  taskId?: string;
}

type EditMode = 'TITLE' | 'DESCRIPTION';

export default function TaskDisplay({ taskId }: TaskDisplayProps) {
  const {
    data: task,
    isLoading,
    mutate,
  } = useSWR<
    Prisma.TaskGetPayload<{
      include: { column: { select: { id: true; label: true; color: true } } };
    }>
  >(`${window.location.origin}/api/tasks/${taskId}`, fetcher);

  const [editMode, setEditMode] = useState<EditMode>();

  const handleCancelEdit = () => {
    setEditMode(undefined);
  };

  const handleEditMode = (mode: EditMode) => () => setEditMode(mode);

  const handleTaskEdit = async (payload: EditTaskPayload) => {
    if (!task) {
      return;
    }

    try {
      const result = await editTask(task.id, payload);
      if (result) {
        mutate((data) => ({ ...data!, ...result }));
        handleCancelEdit();
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {isLoading && <TaskSkeleton />}
      {task && (
        <>
          <DialogHeader className='p-6 pt-10 border-b-2'>
            {editMode === 'TITLE' ? (
              <EditTaskTitle
                title={task.title}
                onCancelEdit={handleCancelEdit}
                onEditSubmit={handleTaskEdit}
              />
            ) : (
              <DialogTitle className='text-2xl font-bold flex justify-between'>
                <div>
                  <span>{task?.title}</span>
                  <span className='text-gray-500'>#{task.id}</span>
                </div>
                <Button
                  aria-label='edit title button'
                  size='sm'
                  variant='link'
                  className='ml-auto inline-block px-0'
                  onClick={handleEditMode('TITLE')}
                >
                  Edit title
                </Button>
              </DialogTitle>
            )}
          </DialogHeader>
          <div className='p-6 grow border-t-2 grid grid-cols-[auto_250px]'>
            <section className='pr-6 flex flex-col gap-2'>
              <h4 className='font-semibold'>Short Description</h4>
              {editMode === 'DESCRIPTION' ? (
                <EditTaskDescription
                  description={task.description}
                  onCancelEdit={handleCancelEdit}
                  onEditSubmit={handleTaskEdit}
                />
              ) : (
                <div className=' flex flex-col justify-start grow'>
                  <div className='grow'>
                    {task.description ? (
                      <MDEditor.Markdown
                        source={task.description}
                        wrapperElement={{ 'data-color-mode': 'light' }}
                      />
                    ) : (
                      <span className='text-gray-500'>
                        No description provided
                      </span>
                    )}
                  </div>
                  <Button
                    size='sm'
                    variant='link'
                    className='px-0 w-max'
                    aria-label='edit description button'
                    onClick={handleEditMode('DESCRIPTION')}
                  >
                    Edit description
                  </Button>
                </div>
              )}
              <small></small>
            </section>
            <section className='border-l pl-6 flex flex-col gap-4'>
              <div className='flex items-center justify-between gap-2'>
                <b>Priority</b>
                <div>
                  <Select
                    value={task.priority}
                    onValueChange={(value) =>
                      handleTaskEdit({ priority: value as TaskPriority })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        <PriorityOption
                          label={capitalize(task.priority)}
                          value={task.priority}
                        />
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent position='popper'>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <PriorityOption {...option} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex items-center justify-between gap-2'>
                <b>Status</b>
                <Badge
                  variant='outline'
                  className={cn(
                    `rounded-full text-sm`,
                    columnBadgeClassNames[task.column.color]
                  )}
                >
                  {task.column.label}
                </Badge>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
