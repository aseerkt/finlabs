import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import Columns from '@/components/columns/Columns';
import BoardModalProvider from '@/context/BoardModalContext';
import ProjectProvider, { ProjectState } from '@/context/ProjectContext';
import ProjectInfo from '@/components/ProjectInfo';
import { resetServerContext } from 'react-beautiful-dnd';

const ProjectPage: NextPage<{ project: ProjectState }> = ({ project }) => {
  return (
    <ProjectProvider project={project}>
      <Head>
        <title>
          finlabs - {project.creator.username}/{project.name}
        </title>
        <meta name='description' content={project.description} />
      </Head>
      <ProjectInfo />
      {/* Boards */}
      <BoardModalProvider>
        <Columns />
      </BoardModalProvider>
    </ProjectProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get(`/projects/${query.projectId}`);
    resetServerContext();
    console.log(res.data);
    return { props: { project: res.data.project } };
  } catch (err) {
    console.error(err);
    return { redirect: { destination: '/projects', permanent: true } };
  }
};

export default ProjectPage;
