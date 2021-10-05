import classNames from 'classnames';

type AvatarProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  isRound?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const Avatar: React.FC<AvatarProps> = ({
  className,
  isRound = false,
  size = 'sm',
  ...props
}) => {
  return (
    <img
      {...props}
      className={classNames(
        'block',
        {
          'rounded-full': isRound,
          'rounded-sm': !isRound,
          'w-8 h-8': size === 'sm',
          'w-20 h-20': size === 'md',
          'w-40 h-40': size === 'lg',
        },
        className
      )}
    />
  );
};

export default Avatar;
