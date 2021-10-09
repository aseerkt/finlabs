import { useProject } from '@/context/ProjectContext';
import useDisclosure from '@/libs/useDisclosure';
import { Menu, MenuItem, MenuList } from '@/shared/menu';
import { FaEllipsisV } from 'react-icons/fa';

const ColumnMenu: React.FC<{ columnId: string }> = ({ columnId }) => {
  const { isOpen, onClose, toggle } = useDisclosure();
  const { clearColumn } = useProject();

  return (
    <Menu onClose={onClose}>
      <button onClick={toggle}>
        <FaEllipsisV />
      </button>
      <MenuList isOpen={isOpen}>
        <MenuItem onClick={() => clearColumn(columnId)}>Clear column</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ColumnMenu;
