import classNames from 'classnames';

type MenuListProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  isOpen: boolean;
};

export const MenuList: React.FC<MenuListProps> = ({
  isOpen,
  className,
  ...props
}) => {
  return (
    <ul
      className={classNames(
        'absolute z-50 right-0 w-max border border-gray-900  bg-gray-700 shadow-xl rounded-md overflow-hidden transition-all duration-300',
        {
          'hidden opacity-0 top-0': !isOpen,
          'block opacity-100 top-full': isOpen,
        },
        className
      )}
      {...props}
    />
  );
};
