import { InputField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { EditTaskComponentProps } from './types';

interface EditTaskTitleProps extends EditTaskComponentProps {
  title: string;
}

export default function EditTaskTitle({
  title,
  onCancelEdit,
  onEditSubmit,
}: EditTaskTitleProps) {
  const form = useForm({ defaultValues: { title } });

  const handleTaskEdit = form.handleSubmit(onEditSubmit);

  return (
    <Form {...form}>
      <form
        onSubmit={handleTaskEdit}
        className='flex w-full items-center gap-2'
      >
        <InputField
          name='title'
          control={form.control}
          placeholder='Enter title here'
          formItemClassName='grow pb-0'
          autoFocus
        />
        <Button variant='outline' type='button' onClick={onCancelEdit}>
          Cancel
        </Button>
        <Button
          type='submit'
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
