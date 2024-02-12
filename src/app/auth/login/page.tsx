import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in to Finlabs',
  description: 'Finlabs is where share, contribute projects and manage tasks',
};

export default function LoginPage() {
  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>Sign in to Finlabs</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className='text-sm'>
          New to Finlabs?{' '}
          <Link className='text-blue-700' href='/auth/signup'>
            Create an account
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}
