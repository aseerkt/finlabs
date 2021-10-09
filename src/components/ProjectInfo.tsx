import dayjs from 'dayjs';
import { useProject } from '@/context/ProjectContext';
import { useAuth } from '@/context/AuthContext';

function ProjectInfo() {
  const { project } = useProject();
  const { user } = useAuth();
  return (
    <>
      <section className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <h1 className='text-4xl font-bold'>
            {project.creator.username}/{project.name}
          </h1>
          <p className='text-lg'>{project.description}</p>
          <small className='text-sm text-gray-400'>
            updated {dayjs(project.updatedAt).fromNow()}
          </small>
        </div>
        <aside>
          <div className='flex items-center space-x-3'>
            boards - {project.boards.length}
          </div>
          <div className='flex items-center space-x-3 text-sm text-gray-400'>
            created at {dayjs(project.createdAt).format('dd m YYYY')}
          </div>
        </aside>
      </section>
    </>
  );
}

export default ProjectInfo;
