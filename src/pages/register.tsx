import { useToast } from '@/context/ToastContext';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { useAuth } from '@/context/AuthContext';
import { InputField } from '@/shared/form-fields';
import Button from '@/shared/Button';
import { checkEmptyObj } from '@/helpers/checkEmptyObj';

function Register() {
  const toast = useToast();
  const { setUser } = useAuth();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>finlabs - register</title>
      </Head>
      <div className='w-full max-w-sm p-5 mx-auto mt-20'>
        <Link href='/'>
          <a className='text-4xl font-bold'>
            <span className='text-blue-700'>fin</span>labs
          </a>
        </Link>
        <h1 className='mt-3 mb-5 text-2xl font-bold border-b'>register</h1>

        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              const res = await axios.post('/users', values);
              if (res.data.user) {
                setUser(res.data.user);
                router.push('/');
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
              <InputField label='username' name='username' />
              <InputField label='email' name='email' />
              <InputField type='password' label='password' name='password' />
              <Button
                disabled={checkEmptyObj(values)}
                isLoading={isSubmitting}
                className='mt-5'
                type='submit'
              >
                register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
