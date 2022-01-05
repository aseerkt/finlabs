import { useProject } from '@/context/ProjectContext';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '@/components/columns/Column';

function ColumnBoards() {
  const {
    project: { columns, boards, _id: projectId },
    onDragEnd,
  } = useProject();

  return (
    <section className='grid gap-3 mt-10 mb-20 md:grid-cols-3 md:gap-5'>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Column
            key={`${projectId}_${column.title}`}
            boards={boards}
            column={column}
          />
        ))}
      </DragDropContext>
    </section>
  );
}

export default ColumnBoards;
