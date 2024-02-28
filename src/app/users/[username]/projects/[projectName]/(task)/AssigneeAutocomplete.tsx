import { AsyncAutocompleteField } from '@/components/form';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';

interface AssigneeAutocompleteProps {
  projectId: number;
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

interface Assignee {
  id: number;
  username: string;
  name: string;
}

export function AssigneeAutocomplete({
  projectId,
  name,
  control,
  label,
  disabled = false,
}: AssigneeAutocompleteProps) {
  const session = useSession();
  const [assigneeOptions, setAssigneeOptions] = useState<Assignee[]>([
    ...(session?.data?.user ? [session.data.user] : []),
  ]);

  const fetchAssignees = (username?: string) => {
    const searchParams = new URLSearchParams();
    if (username?.length) {
      searchParams.set('username', username);
    }
    const assignees = session.data?.user ? [session.data.user] : [];
    fetch(
      `${
        window.location.origin
      }/api/projects/${projectId}/collaborators?${searchParams.toString()}`
    )
      .then((res) => res.json())
      .then((result) =>
        setAssigneeOptions(assignees.concat(result?.users ? result.users : []))
      );
  };

  useEffect(() => {
    fetchAssignees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AsyncAutocompleteField
      name={name}
      control={control}
      options={assigneeOptions}
      onSearch={fetchAssignees}
      getOptionValue={(option) => ({
        id: option.id,
        username: option.username,
      })}
      getSearchValue={(option) => option.username}
      renderOption={(option) => (
        <div className='p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-sm'>
          <b className='font-semibold'>{option.username}</b>
          <span className='text-gray-500'>{option.name}</span>
        </div>
      )}
      renderValue={(value) => value.username}
      optionKey='username'
      valueKey='username'
      label={label}
      placeholder='Select assignee'
      autocompletePlaceholder='Search by username'
      noResultPlaceholder='No assignees found'
      disabled={disabled}
    />
  );
}
