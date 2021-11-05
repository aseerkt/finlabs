import Button from '@/shared/Button';
import classNames from 'classnames';
import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
}

interface ModalCloseProps {
  onClose?: () => void;
  isClosable?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <div
      className={classNames(
        'fixed inset-0 z-40 w-screen h-screen bg-black bg-opacity-40',
        {
          block: isOpen,
          hidden: !isOpen,
        }
      )}
    >
      {children}
    </div>
  );
};

export const ModalContent: React.FC = ({ children }) => {
  return (
    <div className='relative py-20 max-w-sm max-h-[100vh-1rem] mx-auto mt-12 bg-gray-900 rounded-md'>
      {children}
    </div>
  );
};

export const ModalBody: React.FC = ({ children }) => {
  return <main className='max-h-full px-5 overflow-y-auto'>{children}</main>;
};

export const ModalHeader: React.FC<ModalCloseProps> = ({
  children,
  isClosable,
  onClose,
}) => {
  return (
    <header className='absolute inset-x-0 top-0 flex items-center justify-between p-5 text-lg font-bold border-b border-gray-700 h-14'>
      {children}
      {isClosable && onClose && (
        <button onClick={onClose}>
          <FaTimes />
        </button>
      )}
    </header>
  );
};

export const ModalFooter: React.FC<ModalCloseProps> = ({
  children,
  isClosable,
  onClose,
}) => {
  return (
    <footer className='absolute inset-x-0 bottom-0 flex items-center justify-end h-16 p-5 space-x-2 border-t border-gray-700'>
      {children}
      {isClosable && onClose && (
        <Button type='button' variant='outline' onClick={onClose}>
          Close
        </Button>
      )}
    </footer>
  );
};
