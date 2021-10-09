import { useCallback, useState } from 'react';

function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, toggle };
}

export default useDisclosure;
