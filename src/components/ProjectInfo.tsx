import dayjs from 'dayjs';
import { useProject } from '@/context/ProjectContext';
import { useAuth } from '@/context/AuthContext';
import EditProjectModal from '@/components/EditProjectModal';
import { FaGithubSquare, FaKeyboard, FaLink } from 'react-icons/fa';

function ProjectInfo() {
  const { project } = useProject();
  const { user } = useAuth();

  return (
    <>
      <section className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div className='flex flex-col justify-between h-full'>
          <header>
            <h1 className='mb-2 text-3xl font-bold hover:underline'>
              {project.creator.username}/{project.name}
            </h1>
            <p className='text-lg'>{project.description}</p>
            <div className='flex items-center my-2 space-x-3 text-sm text-gray-400'>
              created at {dayjs(project.createdAt).format('DD MMM YYYY')}
            </div>
            <div className='flex items-center my-2 space-x-3'>
              {project.sourceCode && (
                <a
                  title='Source Code'
                  className='hover:text-blue-700 hover:underline'
                  href={project.sourceCode}
                  rel='noreferrer'
                  target='_blank'
                >
                  <FaGithubSquare size='2.3em' />
                </a>
              )}
              {project.website && (
                <a
                  title='Website'
                  className='hover:text-blue-700 hover:underline'
                  href={project.website}
                  rel='noreferrer'
                  target='_blank'
                >
                  <FaLink size='2em' />
                </a>
              )}
            </div>
          </header>
        </div>
        <aside className='flex flex-col justify-between h-full'>
          <div>
            <div className='flex items-center mt-4 overflow-hidden border border-gray-800 rounded-md w-36'>
              <div className='flex items-center p-2 space-x-2 bg-gray-800 shadow-inner'>
                <FaKeyboard />
                <p>Boards</p>
              </div>
              <div className='flex-1 p-2 text-right border-l border-gray-800'>
                <p className='font-semibold'>{project.boards?.length}</p>
              </div>
            </div>
            <small className='inline-block my-2 text-sm text-gray-400'>
              updated {dayjs(project.updatedAt).fromNow()}
            </small>
          </div>
          {user?._id === project.creator._id && <EditProjectModal />}
        </aside>
      </section>
    </>
  );
}

export default ProjectInfo;
