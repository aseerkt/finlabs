'use client';

import { AsyncAutocompleteField, SelectField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CollaboratorRole } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { inviteUser } from './actions';
import { roleOptions } from './constants';
import { InviteCollabSchema, inviteCollabSchema } from './schemas';

interface UserOption {
  id: number;
  username: string;
  name: string;
}

interface InviteCollaboratorsProps {
  projectId: number;
}

export default function InviteCollaborators({
  projectId,
}: InviteCollaboratorsProps) {
  const form = useForm<InviteCollabSchema>({
    defaultValues: {
      collaborators: [],
      role: CollaboratorRole.WRITE,
    },
    resolver: zodResolver(inviteCollabSchema),
  });

  const [userOptions, setUserOptions] = useState<UserOption[]>([]);

  const handleSearch = async (term: string) => {
    if (term.length) {
      fetch(
        `${window.location.origin}/api/projects/${projectId}/collaborators/search?u=${term}`
      )
        .then((res) => res.json())
        .then((res) => setUserOptions(res.users));
    } else {
      setUserOptions([]);
    }
  };

  const handleInviteSubmit = form.handleSubmit(async (values) => {
    try {
      await inviteUser(
        values.collaborators.map((collab) => collab.id),
        projectId,
        values.role
      );
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Invite failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleInviteSubmit} className='flex gap-2'>
        <AsyncAutocompleteField
          name='collaborators'
          control={form.control}
          placeholder='Select collaborators'
          autocompletePlaceholder='Search by username'
          noResultPlaceholder='No users found'
          options={userOptions}
          getOptionValue={(option) => ({
            id: option.id,
            username: option.username,
          })}
          getSearchValue={(option) => option.username}
          optionKey='id'
          valueKey='id'
          renderOption={(option) => (
            <div className='p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-sm'>
              <b className='font-semibold'>{option.username}</b>
              <span className='text-gray-500'>{option.name}</span>
            </div>
          )}
          renderValue={(value) => value.username}
          onSearch={handleSearch}
          multiple
        />
        <SelectField
          name='role'
          control={form.control}
          placeholder='Select role'
          options={roleOptions}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          getCurrentOptionDisplay={(option, placeholder) =>
            option ? `Role: ${option.label}` : placeholder
          }
          optionKey='value'
        />
        <Button
          type='submit'
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Invite
        </Button>
      </form>
    </Form>
  );
}
