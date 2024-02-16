import { DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function TaskSkeleton() {
  return (
    <>
      <DialogHeader className='p-6'>
        <DialogTitle>
          <Skeleton className='w-50 h-12' />
        </DialogTitle>
      </DialogHeader>
      <div className='flex flex-col gap-3 p-6 mt-3'>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-24 h-8' />
          <Skeleton className='w-10 h-8 rounded-md' />
          <Skeleton className='w-32 h-8' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-24 h-8' />
          <Skeleton className='w-10 h-8 rounded-md' />
          <Skeleton className='w-32 h-8' />
        </div>
        <div className='flex flex-col gap-3'>
          <Skeleton className='w-full h-10' />
          <Skeleton className='w-full h-10' />
          <Skeleton className='w-full h-10' />
          <Skeleton className='w-full h-10' />
          <Skeleton className='w-full h-10' />
        </div>
      </div>
    </>
  );
}
