import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { Project } from '@/models/Project';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Board, ColumnsEnum } from '@/models/Board';
import Boards from '@/components/boards/Boards';

const ProjectPage: NextPage<{ project: Project }> = ({ project }) => {
  const [data, setData] = useState(project);

  return (
    <div>
      <Head>
        <title>finlabs - {project.name}</title>
      </Head>
      <section className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <h1 className='text-4xl font-bold'>{data.name}</h1>
          <p className='text-lg'>{data.description}</p>
          <small className='text-sm text-gray-400'>
            updated {dayjs(data.createdAt).fromNow()}
          </small>
        </div>
        <aside>
          <div className='flex items-center space-x-3'>
            boards - {data.boards.length}
          </div>
        </aside>
      </section>
      {/* Boards */}
      <Boards projectId={data._id} boards={data.boards} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get(`/projects/${query.projectId}`);
    return { props: { project: res.data.project } };
  } catch (err) {
    console.error(err);
    return { redirect: { destination: '/projects', permanent: true } };
  }
};

export default ProjectPage;
