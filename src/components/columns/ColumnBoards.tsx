import BoardMenu from '@/components/columns/BoardMenu';
import ColumnMenu from '@/components/columns/ColumnMenu';
import { useBoardModal } from '@/context/BoardModalContext';
import { useProject } from '@/context/ProjectContext';
import { FaPlus } from 'react-icons/fa';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAuth } from '@/context/AuthContext';

function ColumnBoards() {
  const {
    project: { columns, boards, _id: projectId },
    onDragEnd,
  } = useProject();
  const { setBoardModal } = useBoardModal();
  const { user } = useAuth();

  return (
    <section className='grid gap-3 mt-10 mb-20 md:grid-cols-3 md:gap-5'>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <div
            key={`${projectId}_${column.title}`}
            className='border border-gray-600 rounded-md'
          >
            <header className='flex items-center justify-between p-3 border-b border-gray-600'>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full'>
                  <span className='text-sm'>{column.boards.length}</span>
                </div>
                <h2 className='text-lg font-bold'>{column.title}</h2>
              </div>
              <div className='flex items-center space-x-3'>
                <button
                  hidden={!user}
                  onClick={() => setBoardModal(column._id)}
                >
                  <FaPlus />
                </button>

                <ColumnMenu columnId={column._id} />
              </div>
            </header>
            <Droppable droppableId={column._id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='p-3 overflow-y-auto h-96'
                >
                  {column.boards.map((boardId, index) => {
                    const board = boards.find((b) => b._id === boardId);
                    if (!board) return null;
                    return (
                      <Draggable
                        key={`${boardId}_${column._id}`}
                        draggableId={boardId}
                        index={index}
                      >
                        {(provided) => (
                          <article
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className='w-full mb-3 bg-gray-800 border border-gray-800 rounded-md shadow '
                          >
                            <header className='flex items-center justify-between flex-1 p-3'>
                              <h1 className='font-semibold'>{board.title}</h1>
                              <BoardMenu columnId={column._id} board={board} />
                            </header>
                            <div className='px-3 pb-3'>
                              <p className='text-sm font-thin'>
                                {board.description}
                              </p>
                            </div>
                            <small className='inline-block px-3 pb-3 text-gray-300'>
                              Added by {board.author?.username}
                            </small>
                          </article>
                        )}
                      </Draggable>
                    );
                  })}
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
