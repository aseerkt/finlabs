'use client';

import { Button } from '@/components/ui/button';
import { addPrefix, cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

interface TaskSortableProps {
  taskId: number;
  columnId: number;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function TaskSortable({
  taskId,
  columnId,
  children,
  disabled,
}: TaskSortableProps) {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({
    id: addPrefix(taskId, 'task'),
    data: {
      type: 'task',
      columnId,
      taskId,
    },
    disabled,
  });

  const styles: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={cn('relative', isDragging && 'opacity-50')}
      style={styles}
    >
      {children}
      {!disabled && (
        <Button
          className='absolute px-0 left-2 text-white top-1/2 -translate-y-1/2'
          size='sm'
          variant='link'
          aria-label='task drag handle'
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <GripVerticalIcon />
        </Button>
      )}
    </div>
  );
}
