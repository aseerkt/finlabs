import { CollaboratorRole } from '@prisma/client';

export interface ICollaborator {
  id: number;
  username: string;
  name: string;
  role: CollaboratorRole;
}
