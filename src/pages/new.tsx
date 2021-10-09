import Head from 'next/head';
import withAuthServerSideProps from '@/libs/withAuthGSSP';
import { User } from '@/models/User';
import Button from '@/shared/Button';
import { InputField, TextAreaField } from '@/shared/form-fields';
import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/router';
import { isEmptyObj } from '@/helpers/isEmptyObj';

const CreateProjectPage: NextPage<{ user: User }> = () => {
  const toast = useToast();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>create project</title>
      </Head>
      <div className='max-w-md p-5 mx-auto'>
        <h1 className='form-title'>create project</h1>
        <Formik
          initialValues={{ name: '', description: '' }}
          onSubmit={async (values) => {
            try {
              console.log(values);
              const res = await axios.post('/projects', values);
              const project = res.data?.project;

              if (project) {
                toast(`new project ${project.name} created`, 'success');
                router.push(`/projects/${project._id}`);
              }
            } catch (err) {
              console.error(err);
              if (err.response.data.error) {
                toast(err.response.data.error, 'error');
                return;
              }
              toast(err.message, 'error');
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <InputField label='name' name='name' />
              <TextAreaField label='description' name='description' />
              <Button
                disabled={isEmptyObj(values)}
                isLoading={isSubmitting}
                className='mt-5'
                type='submit'
              >
                create project
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

export default CreateProjectPage;
