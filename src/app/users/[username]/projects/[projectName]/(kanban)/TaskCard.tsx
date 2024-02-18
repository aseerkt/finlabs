import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@prisma/client';
import { GripVerticalIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TASK_ID_SEARCH_PARAM_KEY, taskPriorityBgColors } from '../constants';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    priority: TaskPriority;
  };
  isOverlay?: boolean;
}

export default function TaskCard({ task, isOverlay = false }: TaskCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openTask = (e: React.MouseEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(TASK_ID_SEARCH_PARAM_KEY, String(task.id));

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-md',
        isOverlay && 'shadown-lg'
      )}
    >
      <div
        className={cn(
          'absolute left-0 inset-y-0 w-10 flex items-center justify-center',
          taskPriorityBgColors[task.priority]
        )}
      >
        {isOverlay && <GripVerticalIcon color='white' />}
      </div>
      <CardHeader className='pl-14'>
        <CardTitle>
          <Button
            className='p-0 text-left text-wrap'
            variant='link'
            onClick={openTask}
          >
            {task.title}
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
