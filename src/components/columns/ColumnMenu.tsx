import { useAuth } from '@/context/AuthContext';
import { useProject } from '@/context/ProjectContext';
import useDisclosure from '@/libs/useDisclosure';
import { Menu, MenuItem, MenuList } from '@/shared/menu';
import { FaEllipsisV } from 'react-icons/fa';

const ColumnMenu: React.FC<{ columnId: string }> = ({ columnId }) => {
  const { isOpen, onClose, toggle } = useDisclosure();
  const { clearColumn } = useProject();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Menu onClose={onClose}>
      <button onClick={toggle}>
        <FaEllipsisV />
      </button>
      <MenuList isOpen={isOpen}>
        <MenuItem
          onClick={() => {
            clearColumn(columnId);
            onClose();
          }}
        >
          clear column
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ColumnMenu;
