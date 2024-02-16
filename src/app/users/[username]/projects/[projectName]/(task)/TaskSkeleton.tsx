import { DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function TaskSkeleton() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Skeleton className='w-50 h-12' />
        </DialogTitle>
      </DialogHeader>
      <div className='mt-3'>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-12 h-4' />
          <Skeleton className='w-4 h-4 rounded-md' />
          <Skeleton className='w-32 h-4' />
        </div>
        <div className='flex flex-col gap-3'>
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
        </div>
      </div>
    </>
  );
}
