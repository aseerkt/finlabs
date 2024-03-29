import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { AssigneeAutocomplete } from './AssigneeAutocomplete';
import { EditTaskComponentProps } from './types';

interface EditTaskAssigneeFormProps
  extends Pick<EditTaskComponentProps, 'onEditSubmit'> {
  projectId: number;
  assignee?: {
    id: number;
    username: string;
  } | null;
  disabled?: boolean;
}

export default function EditTaskAssigneeForm({
  projectId,
  assignee,
  onEditSubmit,
  disabled = false,
}: EditTaskAssigneeFormProps) {
  const form = useForm({ defaultValues: { assignee }, disabled });

  const handleAssigneeSubmit = form.handleSubmit(onEditSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleAssigneeSubmit}>
        <AssigneeAutocomplete
          name='assignee'
          control={form.control}
          projectId={projectId}
          disabled={disabled}
        />
      </form>
    </Form>
  );
}
