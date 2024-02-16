import { TaskPriority } from '@prisma/client';

export interface EditTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
}

export interface EditTaskComponentProps {
  onCancelEdit: () => void;
  onEditSubmit: (values: EditTaskPayload) => Promise<void>;
}
