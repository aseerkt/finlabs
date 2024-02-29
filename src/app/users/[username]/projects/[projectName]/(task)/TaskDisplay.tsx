import { Markdown } from '@/components/Markdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogHeader } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { cn, fetcher } from '@/lib/utils';
import { Prisma, TaskPriority } from '@prisma/client';
import { DialogTitle } from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { useProjectAccess } from '../ProjectContext';
import { priorityOptions } from '../constants';
import { PriorityOption } from './AddTask';
import EditTaskAssigneeForm from './EditTaskAssigneeForm';
import EditTaskDescription from './EditTaskDescription';
import EditTaskTitle from './EditTaskTitle';
import TaskSkeleton from './TaskSkeleton';
import { editTask } from './actions';
import { columnBadgeClassNames } from './constants';
import { EditTaskPayload } from './types';

dayjs.extend(relativeTime);

interface TaskDisplayProps {
  taskId: string;
  projectId: number;
}

type TaskType = Prisma.TaskGetPayload<{
  include: {
    assignee: { select: { id: true; username: true } };
    reporter: { select: { id: true; username: true } };
    column: { select: { id: true; label: true; color: true } };
  };
}>;

type EditMode = 'TITLE' | 'DESCRIPTION' | 'ASSIGNEE';

export default function TaskDisplay({ projectId, taskId }: TaskDisplayProps) {
  const {
    data: task,
    isLoading,
    mutate,
  } = useSWR<TaskType>(
    `${window.location.origin}/api/tasks/${taskId}`,
    fetcher,
  );
  const hasEditAcces = useProjectAccess('WRITE');

  const [editMode, setEditMode] = useState<EditMode>();

  const handleCancelEdit = () => {
    setEditMode(undefined);
  };

  const handleEditMode = (mode: EditMode) => () => {
    if (hasEditAcces) {
      setEditMode(mode);
    }
  };

  const handleTaskEdit = async (payload: EditTaskPayload) => {
    if (!task) {
      return;
    }

    try {
      await mutate(
        async (current) => {
          const result = await editTask(task.id, payload);
          handleCancelEdit();
          return { ...current!, ...result };
        },
        {
          optimisticData: (current) => ({ ...current!, ...payload }),
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
          throwOnError: true,
        },
      );
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
          <DialogHeader className='border-b-2 p-6 pt-10'>
            {editMode === 'TITLE' ? (
              <EditTaskTitle
                title={task.title}
                onCancelEdit={handleCancelEdit}
                onEditSubmit={handleTaskEdit}
              />
            ) : (
              <DialogTitle className='flex justify-between text-2xl font-bold'>
                <div>
                  <span>{task?.title}</span>
                  <span className='text-gray-400'> #{task.id}</span>
                </div>
                {hasEditAcces && (
                  <Button
                    aria-label='edit title button'
                    size='sm'
                    variant='link'
                    className='ml-auto inline-block px-0'
                    onClick={handleEditMode('TITLE')}
                  >
                    Edit title
                  </Button>
                )}
              </DialogTitle>
            )}
            <DialogDescription className='text-gray-600'>
              <b>
                <Link
                  className='hover:underline'
                  href={`/users/${task.reporter.username}`}
                >
                  {task.reporter.username}
                </Link>
              </b>{' '}
              created {dayjs(task.createdAt).fromNow()}
            </DialogDescription>
          </DialogHeader>
          <div
            aria-label='dialog-body'
            className='grid h-full grid-cols-[auto_380px] overflow-y-hidden border-t-2 p-6'
          >
            <section className='flex h-full flex-col gap-2 overflow-y-hidden pr-6'>
              <div className='flex justify-between'>
                <h4 className='mb-2 font-semibold'>Short Description</h4>
                {hasEditAcces && (
                  <Button
                    size='sm'
                    variant='link'
                    className='w-max px-0'
                    aria-label='edit description button'
                    disabled={!hasEditAcces}
                    onClick={handleEditMode('DESCRIPTION')}
                  >
                    Edit description
                  </Button>
                )}
              </div>
              {editMode === 'DESCRIPTION' ? (
                <EditTaskDescription
                  description={task.description}
                  onCancelEdit={handleCancelEdit}
                  onEditSubmit={handleTaskEdit}
                />
              ) : (
                <div className='flex h-full grow flex-col overflow-y-hidden'>
                  <div className='mb-3 grow overflow-y-auto rounded-md border-2 p-3'>
                    {task.description ? (
                      <Markdown source={task.description} />
                    ) : (
                      <span className='text-gray-500'>
                        No description provided
                      </span>
                    )}
                  </div>
                  <small className='text-sm text-gray-500'>
                    updated {dayjs(task.updatedAt).fromNow()}
                  </small>
                </div>
              )}
            </section>
            <section className='mt-10 flex flex-col'>
              <Table>
                <TableBody className='rounded-md'>
                  <TableRow>
                    <TableHead className='w-[100px]'>Priority</TableHead>
                    <TableCell align='right'>
                      {hasEditAcces ? (
                        <Select
                          value={task.priority}
                          disabled={!hasEditAcces}
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
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <PriorityOption {...option} />
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className='rounded-md border-2 p-2'>
                          <PriorityOption
                            label={capitalize(task.priority)}
                            value={task.priority}
                          />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableCell align='right'>
                      <Badge
                        variant='outline'
                        className={cn(
                          `rounded-full text-sm`,
                          columnBadgeClassNames[task.column.color],
                        )}
                      >
                        {task.column.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Assignee</TableHead>
                    <TableCell align='right' valign='middle'>
                      {hasEditAcces ? (
                        <EditTaskAssigneeForm
                          projectId={projectId}
                          assignee={task.assignee}
                          onEditSubmit={handleTaskEdit}
                          disabled={!hasEditAcces}
                        />
                      ) : (
                        <div className='flex items-center rounded-md border-2 p-2'>
                          {task.assignee?.username ? (
                            <Link
                              className='font-semibold hover:underline'
                              href={`/users/${task.assignee.username}`}
                            >
                              {task.assignee.username}
                            </Link>
                          ) : (
                            <p className='text-gray text-sm'>Not assigned</p>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </div>
        </>
      )}
    </>
  );
}
