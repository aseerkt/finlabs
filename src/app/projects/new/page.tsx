import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAuthSesssion } from '@/lib/authUtils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import CreateProjectForm from './CreateProjectForm';

export const metadata: Metadata = {
  title: 'Create project',
  description: 'Finlabs is where share, contribute projects and manage tasks',
};

export default async function CreateProjectPage() {
  const session = await getAuthSesssion();

  if (!session?.user) {
    redirect('/auth/login');
  }
  return (
    <Card className='mx-auto mt-10 max-w-[700px] w-full '>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>A project contains all the tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateProjectForm />
      </CardContent>
    </Card>
  );
}
