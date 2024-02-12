'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CircleDotIcon, GripVerticalIcon, PlusIcon } from 'lucide-react';
import { RefObject, useRef } from 'react';
import { ShowIfHasAccessFor } from '../ProjectContext';

interface ColumnCardProps {
  column: {
    id: number;
    label: string;
    color: string;
    description: string | null;
  };
  taskCount: number;
  children: React.ReactNode;
  scrollContainerRef?: RefObject<HTMLDivElement>;
  onAddTaskClick?: (columnId: number, ref: RefObject<HTMLDivElement>) => void;
  isOverlay?: boolean;
}

const ColumnCard: React.FC<ColumnCardProps> = ({
  column,
  taskCount,
  children,
  onAddTaskClick,
  isOverlay = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const openAddTaskPanel = () => {
    onAddTaskClick && onAddTaskClick(column.id, scrollRef);
  };

  return (
    <Card
      className={cn(
        'w-96 h-full flex flex-col',
        isOverlay && 'relative shadow-lg'
      )}
    >
      {isOverlay && (
        <Button
          className='absolute top-3 right-3'
          size='icon'
          variant='ghost'
          aria-label='sort column overlay button'
          disabled
        >
          <GripVerticalIcon />
        </Button>
      )}
      <CardHeader className='px-4 pt-5 pb-3 border-b'>
        <CardTitle className='flex gap-2 items-center'>
          <CircleDotIcon
            width={24}
            height={24}
            strokeWidth={3}
            color={column.color}
          />{' '}
          {column.label}
          <Badge variant='outline' className='pt-1 border-2 rounded-full'>
            {taskCount}
          </Badge>
        </CardTitle>
        {column.description && (
          <CardDescription>{column.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent
        className='px-4 py-3 grow overflow-y-auto overflow-x-hidden'
        ref={scrollRef}
      >
        <div className='flex flex-col gap-2'>{children}</div>
      </CardContent>
      <ShowIfHasAccessFor role='WRITE'>
        <CardFooter className='px-3 pb-3 pt-2 border-t'>
          <Button
            variant='ghost'
            className='w-full justify-start items-center'
            onClick={openAddTaskPanel}
          >
            <PlusIcon className='mr-2' />
            Add Task
          </Button>
        </CardFooter>
      </ShowIfHasAccessFor>
    </Card>
  );
};

export default ColumnCard;
