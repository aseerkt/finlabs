import { TextAreaField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { EditTaskComponentProps } from './types';

interface EditTaskDescriptionProps extends EditTaskComponentProps {
  description: string | null;
}

export default function EditTaskDescription({
  description,
  onCancelEdit,
  onEditSubmit,
}: EditTaskDescriptionProps) {
  const form = useForm({ defaultValues: { description: description ?? '' } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEditSubmit)}>
        <TextAreaField
          name='description'
          control={form.control}
          placeholder='Enter short description here...'
          rows={10}
          autoFocus
        />
        <div className='flex justify-end gap-2'>
          <Button variant='outline' type='button' onClick={onCancelEdit}>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
