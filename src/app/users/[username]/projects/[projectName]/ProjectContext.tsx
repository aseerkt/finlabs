'use client';

import { CollaboratorRole } from '@prisma/client';
import { createContext, useCallback, useContext } from 'react';

type ProjectAccessRole = CollaboratorRole | 'AUTHOR';

type IProjectAccessContext = (requiredRole: ProjectAccessRole) => boolean;

const ProjectAccessContext = createContext<IProjectAccessContext>(() => false);

const rolePrecedence: Record<ProjectAccessRole, number> = {
  READ: 0,
  WRITE: 1,
  ADMIN: 2,
  AUTHOR: 3,
};

interface ProjectAccessProviderProps {
  role: ProjectAccessRole;
  children: React.ReactNode;
}

export function ProjectAccessProvider({
  role,
  children,
}: ProjectAccessProviderProps) {
  const hasAccess = useCallback(
    (requiredRole: ProjectAccessRole) => {
      return rolePrecedence[role] >= rolePrecedence[requiredRole];
    },
    [role]
  );
  return (
    <ProjectAccessContext.Provider value={hasAccess}>
      {children}
    </ProjectAccessContext.Provider>
  );
}

export function useProjectAccess(role: ProjectAccessRole) {
  const hasAccess = useContext(ProjectAccessContext);
  return hasAccess(role);
}

export function ShowIfHasAccessFor({
  role,
  children,
}: {
  role: ProjectAccessRole;
  children: React.ReactNode;
}) {
  const hasAccess = useProjectAccess(role);

  if (hasAccess) return <>{children}</>;
  else return null;
}
