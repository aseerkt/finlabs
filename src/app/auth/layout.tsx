import { Card } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Card className='mx-auto mt-10 max-w-[500px] w-full '>{children}</Card>
  );
}
