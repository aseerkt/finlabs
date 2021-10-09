import { createContext, useContext, useReducer } from 'react';
import { OnDragEndResponder } from 'react-beautiful-dnd';
import { IProject } from '@/models/Project';
import { User } from '@/models/User';
import produce from 'immer';
import { IBoard } from '@/models/Board';
import { IColumn } from '@/models/Column';
import axios from 'axios';

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
  addBoard: (board: Partial<IBoard>) => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
  editBoard: (boardToEdit: IBoard) => Promise<void>;
  clearColumn: (columnId: string) => Promise<void>;
  onDragEnd: OnDragEndResponder;
}

const ProjectContext = createContext<ProjectContextType>(null);

const ProjectProvider: React.FC<{ project: ProjectState }> = ({
  project,
  children,
}) => {
  const [state, dispatch] = useReducer(projectReducer, project);

  const addBoard: ProjectContextType['addBoard'] = async (board) => {
    const res = await axios.post(`/projects/${state._id}/boards`, { board });
    if (res.data.board) {
      dispatch({
        type: 'ADD_BOARD',
        payload: { board: res.data.board as IBoard },
      });
    }
  };

  const deleteBoard: ProjectContextType['deleteBoard'] = async (boardId) => {
    const res = await axios.delete(`/projects/${state._id}/boards/${boardId}`);
    if (res.status === 200)
      dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
  };

  const editBoard: ProjectContextType['editBoard'] = async (boardToEdit) => {
    const res = await axios.put(
      `/projects/${state._id}/boards/${boardToEdit._id}`,
      { board: boardToEdit }
    );
    if (res.status === 200)
      dispatch({ type: 'EDIT_BOARD', payload: { board: boardToEdit } });
  };

  const clearColumn: ProjectContextType['clearColumn'] = async (columnId) => {
    const res = await axios.delete(
      `/projects/${state._id}/columns/${columnId}`
    );
    if (res.status === 200)
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
