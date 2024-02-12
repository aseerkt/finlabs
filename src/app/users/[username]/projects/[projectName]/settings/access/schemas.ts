import { zRequiredString } from '@/lib/zodUtils';
import { CollaboratorRole } from '@prisma/client';
import { z } from 'zod';

export const inviteCollabSchema = z.object({
  collaborators: z
    .array(
      z.object({
        id: z.number({ coerce: true }).int(),
        username: zRequiredString('Username required'),
      })
    )
    .min(1),
  role: z.nativeEnum(CollaboratorRole),
});

export type InviteCollabSchema = z.infer<typeof inviteCollabSchema>;
