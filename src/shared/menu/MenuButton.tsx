import Button, { ButtonProps } from '@/shared/Button';

type MenuButtonProps = ButtonProps & {
  onOpen: () => void;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ onOpen, ...props }) => {
  return <Button {...props} onClick={onOpen} />;
};

export default MenuButton;
