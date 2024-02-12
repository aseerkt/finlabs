'use client';

import { useIsMounted } from '@/lib/hooks';
import {
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

interface PortalDragOverlayProps {
  children: React.ReactNode;
}

export default function PortalDragOverlay({
  children,
}: PortalDragOverlayProps) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return createPortal(
    <DragOverlay dropAnimation={dropAnimation}>{children}</DragOverlay>,
    document.body
  );
}
