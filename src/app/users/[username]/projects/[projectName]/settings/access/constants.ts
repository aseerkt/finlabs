import { CollaboratorRole } from '@prisma/client';

export const roleOptions = [
  {
    label: 'Admin',
    value: CollaboratorRole.ADMIN,
  },
  {
    label: 'Write',
    value: CollaboratorRole.WRITE,
  },
  {
    label: 'Read',
    value: CollaboratorRole.READ,
  },
];
