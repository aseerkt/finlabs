import SignUpForm from '@/app/auth/signup/SignUpForm';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join Finlabs - Finlabs',
  description: 'Finlabs is where share, contribute projects and manage tasks',
};

export default function SignUpPage() {
  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>Welcome to Finlabs</CardTitle>
        <CardDescription>Let's begin the adventure</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link className='text-blue-700' href='/auth/login'>
            Login here
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}
