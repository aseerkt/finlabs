import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    priority: TaskPriority;
  };
  isOverlay?: boolean;
}

const taskPriorityColors = {
  [TaskPriority.LOW]: 'bg-blue-500',
  [TaskPriority.MEDIUM]: 'bg-yellow-500',
  [TaskPriority.HIGH]: 'bg-red-500',
};

export default function TaskCard({ task, isOverlay = false }: TaskCardProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openTask = () => {
    const params = new URLSearchParams(searchParams);

    params.set('task', String(task.id));

    replace(`${pathname}?${params.toString()}`);
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
          'absolute left-0 inset-y-0 w-2',
          taskPriorityColors[task.priority]
        )}
      ></div>
      <CardHeader>
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
