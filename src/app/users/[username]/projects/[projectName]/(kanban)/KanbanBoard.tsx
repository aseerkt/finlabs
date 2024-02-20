'use client';

import { toast } from '@/components/ui/use-toast';
import { addPrefix, stripPrefix } from '@/lib/utils';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { debounce } from 'lodash';
import { RefObject, useEffect, useId, useState } from 'react';
import { useImmer } from 'use-immer';
import { AddTask } from '../(task)';
import { useProjectAccess } from '../ProjectContext';
import { BoardData } from '../types';
import ColumnCard from './ColumnCard';
import ColumnSortable from './ColumnSortable';
import PortalDragOverlay from './PortalDragOverlay';
import TaskCard from './TaskCard';
import TaskSortable from './TaskSortable';
import {
  moveTaskBetweenColumns,
  reorderColumns,
  reorderTasksWithinColumn,
} from './actions';

interface KanbanBoardProps {
  projectId: number;
  board: BoardData;
}

interface Overlay {
  itemId?: number;
  itemType?: 'column' | 'task';
}

export default function KanbanBoard({
  projectId,
  board: dbBoard,
}: KanbanBoardProps) {
  const dndContextId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [board, setBoard] = useImmer(dbBoard);
  const [overlay, setOverlay] = useState<Overlay>({});
  const [selectedColumn, setSelectedColumn] = useState<{
    id: number;
    ref: RefObject<HTMLDivElement>;
  }>();
  const hasAccess = useProjectAccess('WRITE');

  useEffect(() => {
    setBoard(dbBoard);
    setTimeout(scrollToBottomOfColumn, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbBoard]);

  const handleBoardServerChange = debounce(
    async (actionPromise: Promise<any>) => {
      try {
        await actionPromise;
      } catch (error) {
        // if board changes failed in server, we reset it back old version
        toast({
          title: 'Something went wrong',
          description: (error as Error).message,
          variant: 'destructive',
        });
        setBoard({ ...board });
      }
    },
    300,
    { leading: true }
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setOverlay({
      itemId: active.data.current?.taskId || active.data.current?.columnId,
      itemType: active.data.current?.type,
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over?.id) {
      return null;
    }

    const activeId = stripPrefix(active.id as string);
    const activeType = active.data.current?.type;
    const overId = stripPrefix(over.id as string);
    const overType = over.data.current?.type;

    if (activeType === 'column' || activeId === overId) {
      return null;
    }

    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.data.current?.columnId;

    // cross column drag
    if (activeColumnId !== overColumnId) {
      const activeTaskIndex = board.items[activeColumnId].indexOf(activeId);
      let overPosition: number;
      if (overType === 'task') {
        const overTaskIndex = board.items[overColumnId].indexOf(overId);
        setBoard((board) => {
          board.items[activeColumnId].splice(activeTaskIndex, 1);
          board.items[overColumnId].splice(overTaskIndex, 0, activeId);
        });
        overPosition = overTaskIndex;
      } else {
        setBoard((board) => {
          board.items[activeColumnId].splice(activeTaskIndex, 1);
          board.items[overColumnId].push(activeId);
        });
        overPosition = board.items[overColumnId].length;
      }

      handleBoardServerChange(
        moveTaskBetweenColumns({
          projectId,
          taskId: activeId,
          sourceColumnId: activeColumnId,
          destinationColumnId: overColumnId,
          position: overPosition,
        })
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over?.id || active.id.toString() === over.id.toString()) {
      return;
    }

    const activeId = stripPrefix(active.id as string);
    const activeType = active.data.current?.type;
    const overId = stripPrefix(over.id as string);
    const overType = over.data.current?.type;

    if (activeType === 'column' && overType === 'column') {
      // handle column swap
      const activeColumnIndex = board.columnIds.indexOf(activeId);
      const overColumnIndex = board.columnIds.indexOf(overId);
      setBoard((board) => {
        board.columnIds = arrayMove(
          board.columnIds,
          activeColumnIndex,
          overColumnIndex
        );
      });
      handleBoardServerChange(
        reorderColumns({
          projectId,
          sourceColumnId: activeId,
          position: overColumnIndex,
        })
      );
    } else if (activeType === 'task' && overType === 'task') {
      const activeColumnId = active.data.current?.columnId;
      const overColumnId = over.data.current?.columnId;
      // dropped on top of task - swap case
      if (activeColumnId === overColumnId) {
        const activeTaskIndex = board.items[activeColumnId].indexOf(activeId);
        const overTaskIndex = board.items[activeColumnId].indexOf(overId);
        setBoard((board) => {
          board.items[activeColumnId] = arrayMove(
            board.items[activeColumnId],
            activeTaskIndex,
            overTaskIndex
          );
        });
        handleBoardServerChange(
          reorderTasksWithinColumn({
            projectId,
            columnId: activeColumnId,
            sourceTaskId: activeId,
            position: overTaskIndex,
          })
        );
      }
    }
    setOverlay({});
  };

  const handleAddTaskTrigger = (
    columnId: number,
    ref: RefObject<HTMLDivElement>
  ) => setSelectedColumn({ id: columnId, ref });

  const unselectColumn = () => setSelectedColumn(undefined);

  const scrollToBottomOfColumn = () => {
    if (
      selectedColumn?.ref.current &&
      selectedColumn.ref.current.scrollHeight >
        selectedColumn.ref.current.clientHeight
    ) {
      // if scrollable scroll to bottom
      selectedColumn.ref.current.scrollTo({
        top: selectedColumn.ref.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    unselectColumn();
  };

  return (
    <div className='relative grow pt-3 border-t rounded-md overflow-y-hidden'>
      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: { strategy: MeasuringStrategy.Always },
        }}
      >
        <div className='flex gap-3 overflow-x-auto px-3 pb-3 h-full'>
          <SortableContext
            disabled={!hasAccess}
            items={board.columnIds.map((columnId) =>
              addPrefix(columnId, 'column')
            )}
          >
            {board.columnIds.map((columnId) => (
              <ColumnSortable
                key={columnId}
                columnId={columnId}
                disabled={!hasAccess}
              >
                <ColumnCard
                  column={board.columns[columnId]}
                  onAddTaskClick={handleAddTaskTrigger}
                  taskCount={board.items[columnId].length}
                >
                  <SortableContext
                    disabled={!hasAccess}
                    items={board.items[columnId].map((taskId) =>
                      addPrefix(taskId, 'task')
                    )}
                  >
                    {board.items[columnId].map((taskId) => (
                      <TaskSortable
                        key={taskId}
                        taskId={taskId}
                        columnId={columnId}
                        disabled={!hasAccess}
                      >
                        <TaskCard task={board.tasks[taskId]} />
                      </TaskSortable>
                    ))}
                  </SortableContext>
                </ColumnCard>
              </ColumnSortable>
            ))}
          </SortableContext>
        </div>
        <PortalDragOverlay>
          {overlay.itemType === 'column' && (
            <ColumnCard
              column={board.columns[overlay.itemId!]}
              taskCount={board.items[overlay.itemId!].length}
              isOverlay
            >
              {board.items[overlay.itemId!].map((taskId) => (
                <TaskCard key={taskId} task={board.tasks[taskId]} isOverlay />
              ))}
            </ColumnCard>
          )}
          {overlay.itemType === 'task' && (
            <TaskCard task={board.tasks[overlay.itemId!]} isOverlay />
          )}
        </PortalDragOverlay>
      </DndContext>

      {hasAccess && (
        <AddTask
          key={selectedColumn?.id}
          projectId={projectId}
          columnId={selectedColumn?.id}
          onClose={scrollToBottomOfColumn}
        />
      )}
    </div>
  );
}
