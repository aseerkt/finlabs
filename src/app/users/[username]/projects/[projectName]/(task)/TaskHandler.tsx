import { Task } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskHandler() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('task');
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    fetch(`${process.env.NEXTAUTH_URL}/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then(setTask);
  }, [taskId]);

  return <div></div>;
}
