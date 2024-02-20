'use client';

import { CollaboratorRole } from '@prisma/client';
import { createContext, useContext } from 'react';

type ProjectAccessRole = CollaboratorRole | 'AUTHOR';

type IProjectAccessContext = ProjectAccessRole | null;

const ProjectAccessContext = createContext<IProjectAccessContext>(null);

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
  return (
    <ProjectAccessContext.Provider value={role}>
      {children}
    </ProjectAccessContext.Provider>
  );
}

export function useProjectAccess(requiredRole: ProjectAccessRole) {
  const role = useContext(ProjectAccessContext);
  return rolePrecedence[role!] >= rolePrecedence[requiredRole];
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
