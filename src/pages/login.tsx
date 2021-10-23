import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { InputField } from '@/shared/form-fields';
import Button from '@/shared/Button';
import { isEmptyObj } from '@/helpers/isEmptyObj';
import usePost from '@/libs/usePost';
import { User } from '@/models/User';

function Login() {
  const toast = useToast();
  const { setUser } = useAuth();
  const router = useRouter();
  const [testLogin, { loading, result }] = usePost<
    { user: User },
    { isTest: boolean }
  >('/users/login');

  useEffect(() => {
    if (result) {
      if (result.user) {
        setUser(result.user);
        router.push('/projects');
      }
    }
  }, [result]);

  return (
    <div>
      <Head>
        <title>finlabs - login</title>
      </Head>
      <div className='w-full max-w-sm p-5 mx-auto mt-20'>
        <Link href='/'>
          <a className='text-4xl font-bold'>
            <span className='text-blue-700'>fin</span>labs
          </a>
        </Link>
        <h1 className='form-title'>login</h1>

        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          onSubmit={async (values) => {
            try {
              const res = await axios.post('/users/login', values);
              if (res.data.user) {
                setUser(res.data.user);
                router.push('/projects');
              }
            } catch (err) {
              if (err.response.data) {
                toast(err.response.data.error, 'error');
              }
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <InputField label='username or email' name='usernameOrEmail' />
              <InputField type='password' label='password' name='password' />
              <div className='flex items-center mt-5 space-x-2'>
                <Button
                  disabled={isEmptyObj(values)}
                  isLoading={isSubmitting}
                  type='submit'
                >
                  login
                </Button>
                <Button
                  isLoading={loading}
                  onClick={() => testLogin({ isTest: true })}
                  type='button'
                  variant='outline'
                >
                  login as guest
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
