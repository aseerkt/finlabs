'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TASK_ID_SEARCH_PARAM_KEY } from '../constants';

const TaskDisplay = dynamic(() => import('./TaskDisplay'));

export default function TaskModal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get(TASK_ID_SEARCH_PARAM_KEY);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(TASK_ID_SEARCH_PARAM_KEY);
    router.replace(`${pathname}${params.toString()}`);
  };

  return (
    <Dialog open={Boolean(taskId)} onOpenChange={handleClose}>
      <DialogContent className='p-0 max-w-[700px] w-full'>
        {taskId && <TaskDisplay taskId={taskId} />}
      </DialogContent>
    </Dialog>
  );
}
