import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { Project } from '@/models/Project';

const ProjectPage: NextPage<{ project: Project }> = ({ project }) => {
  return (
    <div>
      <Head>
        <title>finlabs - {project.name}</title>
      </Head>
      <pre>{JSON.stringify(project, null, 2)}</pre>
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
