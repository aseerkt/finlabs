import useClickAway from '@/libs/useClickAway';
import { createRef } from 'react';

type MenuProps = {
  onClose: () => void;
};

export const Menu: React.FC<MenuProps> = (props) => {
  const ref = createRef<HTMLDivElement>();
  useClickAway(ref, props.onClose);
  return (
    <div ref={ref} className='relative z-50 flex py-2'>
      {props.children}
    </div>
  );
};
