import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isRound?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  className,
  isRound = false,
  size,
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames('btn flex items-center', className, {
        'btn-outline': variant === 'outline',
        'rounded-full overflow-hidden': isRound,
        'text-lg': size === 'lg',
        'text-sm': size === 'sm',
      })}
      {...props}
      disabled={disabled || isLoading}
    >
      {isLoading && <FaSpinner className='mr-2 animate-spin' />}
      {children}
    </button>
  );
};

export default Button;
