import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import CreateProjectForm from './CreateProjectForm';

export const metadata: Metadata = {
  title: 'Create project',
  description: 'Finlabs is where share, contribute projects and manage tasks',
};

export default function CreateProjectPage() {
  return (
    <Card className='mx-auto mt-10 max-w-[500px] w-full '>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <CreateProjectForm />
      </CardContent>
    </Card>
  );
}
