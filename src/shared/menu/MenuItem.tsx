import classNames from 'classnames';

type MenuItemProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export const MenuItem: React.FC<MenuItemProps> = ({ className, ...props }) => {
  return (
    <li
      className={classNames(
        'flex items-center font-semibold h-10 px-3 hover:bg-gray-800 cursor-pointer',
        className
      )}
      {...props}
    />
  );
};
