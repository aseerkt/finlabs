'use client';

import { Button } from '@/components/ui/button';
import { addPrefix, cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

interface ColumnSortableProps {
  columnId: number;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function ColumnSortable({
  columnId,
  children,
  disabled,
}: ColumnSortableProps) {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({
    id: addPrefix(columnId, 'column'),
    data: {
      type: 'column',
      columnId,
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
    >
      {children}
      {!disabled && (
        <Button
          className='absolute top-3 right-3'
          size='icon'
          variant='ghost'
          aria-label='sort column button'
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <GripVerticalIcon />
        </Button>
      )}
    </div>
  );
}
