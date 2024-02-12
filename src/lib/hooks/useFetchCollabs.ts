import { CollaboratorRole } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '../utils';

interface ICollaborator {
  id: number;
  username: string;
  name: string;
  role: CollaboratorRole;
}

export default function useFetchCollabs(
  projectId: number,
  username: string,
  role: string
) {
  const searchParams = new URLSearchParams();
  if (role) searchParams.set('role', role);
  if (username) searchParams.set('username', username);

  const { data, ...rest } = useSWR<{ users: ICollaborator[] }>(
    `/api/projects/${projectId}/collaborators?${searchParams.toString()}`,
    fetcher
  );

  return {
    collabs: data?.users ?? [],
    ...rest,
  };
}
