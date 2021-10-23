import BoardMenu from '@/components/columns/BoardMenu';
import ColumnMenu from '@/components/columns/ColumnMenu';
import { useBoardModal } from '@/context/BoardModalContext';
import { useProject } from '@/context/ProjectContext';
import { Board } from '@/models/Board';
import { FaPlus } from 'react-icons/fa';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function ColumnBoards() {
  const {
    project: { columns, boards, _id: projectId },
    onDragEnd,
  } = useProject();
  const { setBoardModal } = useBoardModal();

  return (
    <section className='grid gap-3 my-20 md:grid-cols-3 md:gap-5'>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <div
            key={`${projectId}_${column.title}`}
            className='border border-gray-600 rounded-md'
          >
            <header className='flex items-center justify-between p-3 border-b border-gray-600'>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full'>
                  <span className='text-sm'>
                    {boards.filter((b) => b.columnId === column._id).length}
                  </span>
                </div>
                <h2 className='text-lg font-bold'>{column.title}</h2>
              </div>
              <div className='flex items-center space-x-3'>
                <>
                  <button
                    onClick={() =>
                      setBoardModal({
                        columnId: column._id,
                        title: column.title,
                      })
                    }
                  >
                    <FaPlus />
                  </button>
                </>
                <ColumnMenu columnId={column._id} />
              </div>
            </header>
            <Droppable droppableId={column.title}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='p-3 overflow-y-auto h-80'
                >
                  {boards
                    .filter((b) => b.columnId === column._id)
                    .map((b, index) => (
                      <Draggable key={b._id} draggableId={b._id} index={index}>
                        {(provided) => (
                          <article
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            key={b._id}
                            className='w-full mb-3 space-x-1 bg-gray-800 border border-gray-800 rounded-md shadow '
                          >
                            <header className='flex items-center justify-between flex-1 p-2'>
                              <h1 className='font-semibold'>{b.title}</h1>
                              <BoardMenu column={column} board={b} />
                            </header>
                            <div className='px-2 pb-2'>
                              <p className='font-thin'>{b.description}</p>
                            </div>
                            <small className='inline-block px-2 pb-2 text-gray-300'>
                              Added by {b.author?.username}
                            </small>
                          </article>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </section>
  );
}

export default ColumnBoards;
