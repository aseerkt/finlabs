import { createContext, useContext, useReducer } from 'react';
import { OnDragEndResponder } from 'react-beautiful-dnd';
import { IProject } from '@/models/Project';
import { User } from '@/models/User';
import produce from 'immer';
import { IBoard } from '@/models/Board';
import { IColumn } from '@/models/Column';

type BoardActionPayload = {
  columnId?: string;
  board?: IBoard;
  boardId?: string;
};

interface ProjectAction {
  type:
    | 'ADD_BOARD'
    | 'EDIT_BOARD'
    | 'DELETE_BOARD'
    | 'CLEAR_COLUMN'
    | 'SET_COLUMN';
  payload?: string | BoardActionPayload;
}

export interface ProjectState extends Omit<IProject, 'creator'> {
  columns: IColumn[];
  boards: IBoard[];
  creator: User;
}

const projectReducer = produce((draft: ProjectState, action: ProjectAction) => {
  switch (action.type) {
    case 'ADD_BOARD': {
      const { board } = action.payload as BoardActionPayload;
      draft.boards.push(board as IBoard);
      break;
    }
    case 'DELETE_BOARD': {
      const { boardId } = action.payload as BoardActionPayload;
      draft.boards = draft.boards.filter((b) => b._id !== boardId);
      break;
    }
    case 'EDIT_BOARD': {
      const { board } = action.payload as BoardActionPayload;
      const boardIndex = draft.boards.findIndex((b) => b._id === board._id);
      draft.boards.splice(boardIndex, 1, board);
      break;
    }
    case 'CLEAR_COLUMN': {
      const columnId = action.payload;
      draft.boards = draft.boards.filter((b) => b.columnId !== columnId);
      break;
    }
    default:
      break;
  }
});

interface ProjectContextType {
  project: ProjectState;
  addBoard: (board: Partial<IBoard>) => void;
  deleteBoard: (boardId: string) => void;
  editBoard: (boardToEdit: IBoard) => void;
  clearColumn: (columnId: string) => void;
  onDragEnd: OnDragEndResponder;
}

const ProjectContext = createContext<ProjectContextType>(null);

const ProjectProvider: React.FC<{ project: ProjectState }> = ({
  project,
  children,
}) => {
  const [state, dispatch] = useReducer(projectReducer, project);

  const addBoard: ProjectContextType['addBoard'] = (board) => {
    dispatch({ type: 'ADD_BOARD', payload: { board: board as IBoard } });
  };

  const deleteBoard: ProjectContextType['deleteBoard'] = (boardId) => {
    dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
  };

  const editBoard: ProjectContextType['editBoard'] = (boardToEdit) => {
    dispatch({ type: 'EDIT_BOARD', payload: { board: boardToEdit } });
  };

  const clearColumn: ProjectContextType['clearColumn'] = (columnId) => {
    dispatch({ type: 'CLEAR_COLUMN', payload: columnId });
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    console.log(result);
    const {} = result;
  };

  return (
    <ProjectContext.Provider
      value={{
        project: state,
        addBoard,
        deleteBoard,
        editBoard,
        clearColumn,
        onDragEnd,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);

export default ProjectProvider;
