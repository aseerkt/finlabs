'use client';

import { Markdown } from '@/components/Markdown';
import { MdEditorField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toastUnknownError } from '@/components/ui/use-toast';
import { useIsMounted } from '@/lib/hooks';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { editBio } from './actions';

interface UserBioProps {
  userId: number;
  bio: string | null;
}

export default function UserBio({ userId, bio }: UserBioProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((b) => !b);
  };

  return (
    <div>
      {isEditMode ? (
        <EditBio userId={userId} bio={bio} onCancel={toggleEditMode} />
      ) : bio ? (
        <div>
          <header className='flex justify-end space-x-3'>
            <Button variant='link' className='px-0' onClick={toggleEditMode}>
              Edit bio
            </Button>
          </header>
          <Markdown source={bio} />
        </div>
      ) : (
        <div>
          <p className='text-gray-500 mb-3'>No bio found</p>
          <AddBioButton userId={userId} onAddBio={toggleEditMode} />
        </div>
      )}
    </div>
  );
}

interface AddBioButtonProps {
  userId: number;
  onAddBio: () => void;
}

function AddBioButton({ userId, onAddBio }: AddBioButtonProps) {
  const { data } = useSession();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  const isCurrentUser = data?.user.id === userId;

  return (
    isCurrentUser && (
      <Button variant='outline' onClick={onAddBio}>
        Add bio
      </Button>
    )
  );
}

function EditBio({ bio, onCancel }: UserBioProps & { onCancel: () => void }) {
  const form = useForm({
    defaultValues: {
      bio: bio ?? '',
    },
  });

  const handleBioEdit = form.handleSubmit(async ({ bio }) => {
    try {
      await editBio(bio);
      onCancel();
    } catch (error) {
      toastUnknownError(error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleBioEdit}>
        <MdEditorField
          name='bio'
          control={form.control}
          label='Short Bio'
          height={450}
        />
        <div className='flex justify-end gap-3 items-center'>
          <Button type='button' variant='ghost' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            Save bio
          </Button>
        </div>
      </form>
    </Form>
  );
}
