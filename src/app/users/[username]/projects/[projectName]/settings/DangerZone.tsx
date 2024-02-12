'use client';

import { Button } from '@/components/ui/button';
import debounce from 'lodash/debounce';
import {
  deleteProjet,
  toggleProjectOpenness,
  toggleProjectVisibility,
} from './actions';

interface DangerZoneProps {
  projectId: number;
  isPublic: boolean;
  isActive: boolean;
}

export default function DangerZone({
  projectId,
  isPublic,
  isActive,
}: DangerZoneProps) {
  const dangerOps = [
    {
      id: 'visibility',
      name: 'Visibility',
      description: isPublic
        ? 'This project is currently public'
        : 'This project is currently private',
      actionButtonText: isPublic ? 'Make it private' : 'Make it public',
      action: toggleProjectVisibility,
    },
    {
      id: 'is-active',
      name: isActive ? 'Close project' : 'Re-open project',
      description: isActive
        ? 'Re-opening a project will add it to the list of open projects.'
        : 'Closing a project will remove it from the list of open projects.',
      actionButtonText: isActive ? 'Close project' : 'Re-open project',
      action: toggleProjectOpenness,
    },
    {
      id: 'delete',
      name: 'Delete project',
      description:
        'Once you delete a project, there is no going back. Please be certain.',
      actionButtonText: 'Delete project',
      action: deleteProjet,
    },
  ];
  return (
    <div>
      <h2 className='mb-3 text-xl font-semibold border-b'>Danger Zone</h2>
      <div className='border border-red-500 rounded-md'>
        <ul>
          {dangerOps.map((operation) => (
            <li
              key={operation.id}
              className='flex justify-between p-3 border-b border-red-700'
            >
              <div>
                <h4 className='font-semibold mb-2'>{operation.name}</h4>
                <span className='text-gray-600 text-sm'>
                  {operation.description}
                </span>
              </div>
              <Button
                variant='outline'
                className='text-red-600 hover:text-red-700  border border-red-500'
                onClick={debounce(() => operation.action(projectId), 300, {
                  leading: true,
                })}
              >
                {operation.actionButtonText}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
