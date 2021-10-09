import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { Project } from '@/models/Project';
import ColumnBoards from '@/components/columns/ColumnBoards';
import BoardModalProvider from '@/context/BoardModalContext';
import ProjectProvider, { ProjectState } from '@/context/ProjectContext';
import ProjectInfo from '@/components/ProjectInfo';
import { resetServerContext } from 'react-beautiful-dnd';

const ProjectPage: NextPage<{ project: ProjectState }> = ({ project }) => {
  console.log(project);
  return (
    <ProjectProvider project={project}>
      <Head>
        <title>finlabs - {project.name}</title>
      </Head>
      <ProjectInfo />
      {/* Boards */}
      <BoardModalProvider>
        <ColumnBoards />
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
