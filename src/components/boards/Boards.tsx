import { Board, Columns } from '@/models/Board';
import { ObjectId } from 'mongoose';
import { FaEllipsisH, FaEllipsisV, FaPlus } from 'react-icons/fa';

interface BoardsProps {
  boards: Board[];
  projectId: ObjectId;
}

function Boards({ boards, projectId }: BoardsProps) {
  return (
    <section className='grid grid-cols-3 gap-3 my-20 md:gap-5'>
      {Columns.map((column) => (
        <div
          key={`${projectId}_${column}`}
          className='border border-gray-600 rounded-md'
        >
          <header className='flex items-center justify-between p-3 border-b border-gray-600'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full'>
                <span className='text-sm'>
                  {boards.filter((b: Board) => b.column === column).length}
                </span>
              </div>
              <h2 className='text-lg font-bold'>{column}</h2>
            </div>
            <div className='flex items-center space-x-3'>
              <button>
                <FaPlus />
              </button>
              <button>
                <FaEllipsisV className='font-semibold' />
              </button>
            </div>
          </header>
          <div className='p-3 overflow-auto h-80'>
            {boards
              .filter((b: Board) => b.column === column)
              .map((b: Board) => (
                <article
                  key={b._id}
                  className='mb-3 bg-gray-800 border border-gray-800 rounded-md shadow'
                >
                  <header className='flex items-center justify-between p-2'>
                    <h1 className='font-semibold'>{b.title}</h1>
                    <button>
                      <FaEllipsisH className='font-semibold' />
                    </button>
                  </header>
                  <div className='px-2 pb-2'>
                    <p className='font-thin'>{b.description}</p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Boards;
