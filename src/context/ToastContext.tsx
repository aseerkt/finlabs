import React, { createContext, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from 'react-icons/fa';

type ToastStatus = 'success' | 'error' | 'info';
type ToastMessage = (message: string, status: ToastStatus) => void;

type ToastContextType = ToastMessage;

const ToastContext = createContext<ToastContextType>(null as any);

const TOAST_ICONS = {
  success: <FaCheckCircle />,
  error: <FaExclamationCircle />,
  info: <FaInfoCircle />,
};

export const useToast = () => useContext(ToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string | undefined>();
  const [status, setStatus] = useState<ToastStatus | undefined>();

  useEffect(() => {
    let clearMessageTimeout: NodeJS.Timeout;
    if (message) {
      clearMessageTimeout = setTimeout(() => {
        closeMessage();
      }, 3000);
    }
    return () => {
      clearTimeout(clearMessageTimeout);
    };
  }, [message]);

  const toastMessage: ToastMessage = (message, status) => {
    setMessage(message);
    setStatus(status);
  };

  function closeMessage() {
    setMessage(undefined);
    setStatus(undefined);
  }

  return (
    <ToastContext.Provider value={toastMessage}>
      {children}
      <div
        className={classNames(
          'fixed transition-all left-1/2 transform -translate-x-1/2  p-2 max-w-sm w-full h-12 rounded-md duration-300 flex items-center',
          {
            'bg-green-400': status === 'success',
            'bg-blue-400': status === 'info',
            'bg-red-400': status === 'error',
            'bottom-5 opacity-100': !!status,
            '-bottom-20 opacity-0': !status,
          }
        )}
      >
        <div className='w-5'>{status && TOAST_ICONS[status]}</div>
        <p className='flex-1 mx-5'>{message}</p>
        <button onClick={closeMessage} className='inline-block w-5'>
          {status && <FaTimesCircle />}
        </button>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
