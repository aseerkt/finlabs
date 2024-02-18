import { TaskPriority } from '@prisma/client';

export interface EditTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  assignee?: {
    id: number;
    username: string;
  } | null;
}

export interface EditTaskComponentProps {
  onCancelEdit: () => void;
  onEditSubmit: (values: EditTaskPayload) => Promise<void>;
}
