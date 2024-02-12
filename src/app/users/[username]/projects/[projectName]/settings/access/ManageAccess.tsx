'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import useDebounce from '@/lib/hooks/useDebounce';
import useFetchCollabs from '@/lib/hooks/useFetchCollabs';
import { CollaboratorRole } from '@prisma/client';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChangeEvent, useEffect, useState } from 'react';
import { changeRole, revokeAccess } from './actions';
import { roleOptions } from './constants';

interface ManageAccessProps {
  projectId: number;
}

function CollabsSkeleton() {
  return (
    <div className='flex flex-col items-center space-y-2 w-full'>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
    </div>
  );
}

const RolesSelectContent = () => (
  <SelectContent>
    {roleOptions.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
);

const EmptyCollabsContent = ({ hasFilter }: { hasFilter: boolean }) => (
  <div className='flex flex-col text-center p-8 grow items-center justify-center'>
    <h3 className='text-xl font-semibold mb-1'>
      {hasFilter
        ? 'No collaborators found.'
        : "You don't have any collaborators yet."}
    </h3>
    <span>
      {hasFilter
        ? 'Try to change or remove some filters to see results.'
        : 'Add a collaborator to see them here.'}
    </span>
  </div>
);

export default function ManageAccess({ projectId }: ManageAccessProps) {
  const [role, setRole] = useState('');
  const [term, setTerm] = useState('');
  const debounceTerm = useDebounce(term);

  const { collabs, isLoading, mutate } = useFetchCollabs(
    projectId,
    debounceTerm,
    role
  );
  const [selectedCollabs, setSelectedCollabs] = useState<number[]>([]);

  useEffect(() => {
    if (selectedCollabs.length) {
      setSelectedCollabs([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collabs]);

  const toggleSelectAllCollabs = (checked: CheckedState) => {
    if (checked) setSelectedCollabs(collabs.map((collab) => collab.id));
    else setSelectedCollabs([]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const toggleCollabSelection =
    (collabId: number) => (checked: CheckedState) => {
      setSelectedCollabs((collabs) => {
        if (checked) return collabs.concat(collabId);
        else return collabs.filter((userId) => userId === collabId);
      });
    };

  const handleRemoveAccess = (collabIds: number[]) => async () => {
    try {
      await revokeAccess(collabIds, projectId);
      mutate((collabs) => ({
        users:
          collabs?.users.filter((collab) => collabIds.includes(collab.id)) ??
          [],
      }));
    } catch (error) {
      mutate({ users: collabs });
      toast({
        title: 'Unable to revoke access',
        description: (error as Error).message,
      });
    }
  };

  const handeChangeRole = (collabId: number) => async (value: string) => {
    try {
      await changeRole(collabId, projectId, value as CollaboratorRole);
      mutate((collabs) => ({
        users:
          collabs?.users.map((collab) => ({
            ...collab,
            role:
              collab.id === collabId
                ? (value as CollaboratorRole)
                : collab.role,
          })) ?? [],
      }));
    } catch (error) {
      mutate({ users: collabs });
      toast({
        title: 'Unable to change role',
        description: (error as Error).message,
      });
    }
  };

  return (
    <Card>
      <CardHeader className='flex-row items-center p-4 border-b-2 justify-between'>
        <div className='flex gap-2 items-center'>
          <Checkbox
            checked={selectedCollabs.length === collabs.length}
            onCheckedChange={toggleSelectAllCollabs}
            disabled={collabs.length === 0}
            id='select-all'
          />{' '}
          <Label htmlFor='select-all'>
            {collabs.length === 0 ? '0 members' : 'Select all'}
          </Label>
        </div>
        <div className='flex items-center gap-3'>
          {selectedCollabs.length !== 0 && (
            <Button
              variant='destructive'
              onClick={handleRemoveAccess(selectedCollabs)}
            >
              Revoke access for members
            </Button>
          )}
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder='Role'>
                Role{role ? `: ${role}` : ' '}
              </SelectValue>
            </SelectTrigger>
            <RolesSelectContent />
          </Select>
        </div>
      </CardHeader>
      <CardContent className='p-4 border-b-2'>
        <Input
          type='search'
          placeholder='Find a collaborator'
          value={term}
          onChange={handleSearch}
        />
      </CardContent>
      <CardFooter className='p-4'>
        {isLoading ? (
          <CollabsSkeleton />
        ) : collabs.length === 0 ? (
          <EmptyCollabsContent hasFilter={Boolean(role || term)} />
        ) : (
          <ul className='flex flex-col gap-2 grow'>
            {collabs.map((collab) => (
              <li
                key={collab.id}
                className='flex gap-2 items-center justify-between'
              >
                <div className='flex items-center gap-2'>
                  <Checkbox
                    id={`check_${collab.id}`}
                    checked={selectedCollabs.includes(collab.id)}
                    onCheckedChange={toggleCollabSelection(collab.id)}
                  />
                  <Label htmlFor={`check_${collab.id}`}>
                    <b>{collab.username}</b>{' '}
                    <span className='text-gray-500'>{collab.name}</span>
                  </Label>
                </div>
                <div className='flex items-center gap-2'>
                  <Select
                    value={collab.role}
                    onValueChange={handeChangeRole(collab.id)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <RolesSelectContent />
                  </Select>
                  <Button
                    variant='destructive'
                    onClick={handleRemoveAccess([collab.id])}
                  >
                    Remove access
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardFooter>
    </Card>
  );
}
