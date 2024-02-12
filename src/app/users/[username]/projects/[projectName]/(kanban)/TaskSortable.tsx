'use client';

import { addPrefix, cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
