import { RefObject, useRef } from 'react';
import { BoardData } from './types';

export function createBoardColumnRefs(board: BoardData) {
  return board.columnIds.reduce<Record<string, RefObject<HTMLDivElement>>>(
    (prev, columnId) => ({
      ...prev,
      [columnId]: useRef<HTMLDivElement>(null),
    }),
    {}
  );
}
