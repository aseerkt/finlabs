import BoardMenu from '@/components/boards/BoardMenu';
import { IBoard } from '@/models/Board';
import { IColumn } from '@/models/Column';
import { Draggable } from 'react-beautiful-dnd';

interface BoardProps {
  column: IColumn;
  board: IBoard;
  dragIndex: number;
}

function Board({ column, board, dragIndex }: BoardProps) {
  return (
    <Draggable draggableId={board._id} index={dragIndex}>
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
            <p className='text-sm font-thin'>{board.description}</p>
          </div>
          <small className='inline-block px-3 pb-3 text-gray-300'>
            Added by {board.author?.username}
          </small>
        </article>
      )}
    </Draggable>
  );
}

export default Board;
