import { useRouter } from 'next/router';
import { FaEllipsisH } from 'react-icons/fa';
import { useBoardModal } from '@/context/BoardModalContext';
import { useProject } from '@/context/ProjectContext';
import useDisclosure from '@/libs/useDisclosure';
import { IBoard } from '@/models/Board';
import { IColumn } from '@/models/Column';
import { Menu, MenuItem, MenuList } from '@/shared/menu';
import { useAuth } from '@/context/AuthContext';

interface BoardMenuProps {
  column: IColumn;
  board: IBoard;
}

const BoardMenu: React.FC<BoardMenuProps> = ({ column, board }) => {
  const { onClose, toggle, isOpen } = useDisclosure();
  const { setBoardModal } = useBoardModal();
  const { deleteBoard } = useProject();
  const { user } = useAuth();

  if (!user) return null;

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
          edit board
        </MenuItem>
        <MenuItem onClick={() => deleteBoard(board._id, column._id)}>
          delete board
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default BoardMenu;
