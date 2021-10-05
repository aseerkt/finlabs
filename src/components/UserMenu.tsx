import { useAuth } from '@/context/AuthContext';
import useDisclosure from '@/libs/useDisclosure';
import { Menu, MenuList, MenuItem, MenuButton } from '@/shared/menu';
import axios from 'axios';

const UserMenu: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUser } = useAuth();

  return (
    <Menu onClose={onClose}>
      <MenuButton
        className='p-0 border'
        isRound
        aria-label='user-menu-trigger'
        onOpen={onOpen}
      >
        {children}
      </MenuButton>
      <MenuList isOpen={isOpen}>
        <MenuItem>Your Profile</MenuItem>
        <MenuItem>Your Projects</MenuItem>
        <MenuItem
          onClick={async () => {
            const res = await axios.get('/users/logout');
            if (res.data === 'Ok') {
              setUser(null);
            }
          }}
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
