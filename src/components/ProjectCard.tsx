import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

dayjs.extend(relativeTime);

interface ProjectCardProps {
  project: {
    name: string;
    description: string | null;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: {
      name: string;
      username: string;
    };
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='flex space-x-3 items-end'>
            <Link
              className='hover:underline text-lg'
              href={`/users/${project.author.username}/projects/${project.name}`}
            >
              {project.author.username}/{project.name}
            </Link>
            <Badge>{project.isPublic ? 'Public' : 'Private'}</Badge>
          </CardTitle>
          <CardDescription className='text-base'>
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex pt-0 items-center space-x-5 text-sm  text-gray-500'>
          {project.updatedAt ? (
            <span>Updated {dayjs(project.updatedAt).fromNow()}</span>
          ) : (
            <span>Created {dayjs(project.createdAt).fromNow()}</span>
          )}
        </CardFooter>
      </Card>
    </li>
  );
}
