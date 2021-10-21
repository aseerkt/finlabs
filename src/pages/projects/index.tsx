import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Avatar from '@/shared/Avatar';
import { FaKeyboard } from 'react-icons/fa';
import dayjs from 'dayjs';
import { ProjectState } from '@/context/ProjectContext';

const ProjectsPage: NextPage<{ projects: Omit<ProjectState, 'columns'>[] }> = ({
  projects,
}) => {
  return (
    <div>
      <Head>
        <title>finlab - projects</title>
      </Head>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((p) => (
          <div
            key={p._id}
            className='p-8 mb-5 bg-gray-900 border border-gray-800 rounded-md shadow-2xl'
          >
            <Link href={`/projects/${p._id}`}>
              <h1 className='pb-3 mb-5 text-3xl font-bold border-b border-gray-800 cursor-pointer hover:underline w-max'>
                {p.name}
              </h1>
            </Link>
            <div className='flex items-center mb-5 space-x-2'>
              <Avatar src={p.creator.avatar} size='sm' isRound />
              <h3 className='font-semibold'>{p.creator.username}</h3>
            </div>
            <small className='text-gray-400'>
              last updated <strong>{dayjs(p.updatedAt).fromNow()}</strong>
            </small>
            <p className='mt-3'>{p.description}</p>
            <div className='flex items-center mt-4 overflow-hidden border border-gray-800 rounded-md w-36'>
              <div className='flex items-center p-2 space-x-2 bg-gray-800 shadow-inner'>
                <FaKeyboard />
                <p>Boards</p>
              </div>
              <div className='flex-1 p-2 text-right border-l border-gray-800'>
                <p className='font-semibold'>{p.boards?.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get('/projects');
    return { props: { projects: res.data?.projects } };
  } catch (err) {
    console.error(err);
    return { redirect: { permanent: false, destination: '/' } };
  }
};

export default ProjectsPage;
