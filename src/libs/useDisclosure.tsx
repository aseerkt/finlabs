import { useCallback, useState } from 'react';

function useDisclosure(onCloseExtension?: () => void) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => {
    setIsOpen(false);
    if (onCloseExtension) onCloseExtension();
  }, []);
  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, toggle };
}

export default useDisclosure;
