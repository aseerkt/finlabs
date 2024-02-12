import { InputField } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { editProfile } from './actions';
import { profileSchema } from './schemas';

interface EditProfileModalProps {
  user: {
    username: string;
    name: string;
    website: string | null;
    location: string | null;
  };
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const { update: updateSession, data: sessionData } = useSession();
  const form = useForm({
    defaultValues: {
      name: user.name,
      location: user.location ?? '',
      website: user.website ?? '',
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await editProfile(values);
      toast({
        title: 'Profile updated',
        variant: 'success',
      });
      updateSession({ ...sessionData, name: values.name });
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='flex items-center'>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form id='edit-profile' onSubmit={onSubmit} noValidate>
              <InputField label='Name' name='name' control={form.control} />
              <InputField
                label='Location'
                name='location'
                control={form.control}
              />
              <InputField
                type='url'
                label='Webiste'
                name='website'
                control={form.control}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost' autoFocus type='button'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            form='edit-profile'
            type='submit'
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
