import { useBoardModal } from '@/context/BoardModalContext';
import { useProject } from '@/context/ProjectContext';
import useDisclosure from '@/libs/useDisclosure';
import { IBoard } from '@/models/Board';
import { IColumn } from '@/models/Column';
import { Menu, MenuItem, MenuList } from '@/shared/menu';
import { FaEllipsisH } from 'react-icons/fa';

interface BoardMenuProps {
  column: IColumn;
  board: IBoard;
}

const BoardMenu: React.FC<BoardMenuProps> = ({ column, board }) => {
  const { onClose, toggle, isOpen } = useDisclosure();
  const { setBoardModal } = useBoardModal();
  const { deleteBoard } = useProject();

  return (
    <Menu onClose={onClose}>
      <button onClick={toggle}>
        <FaEllipsisH />
      </button>
      <MenuList isOpen={isOpen}>
        <MenuItem
          onClick={() =>
            setBoardModal({ columnId: column._id, title: column.title }, board)
          }
        >
          Edit board
        </MenuItem>
        <MenuItem onClick={() => deleteBoard(board._id)}>Delete board</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default BoardMenu;
