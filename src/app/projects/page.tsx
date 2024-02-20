import ProjectCard from '@/components/ProjectCard';
import { Navbar } from '@/components/navbar';
import { getAuthSesssion } from '@/lib/authUtils';
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const session = await getAuthSesssion();
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { isPublic: true },
        session?.user
          ? {
              isPublic: false,
              OR: [
                { authorId: session?.user.id },
                { collaborators: { some: { userId: session?.user.id } } },
              ],
            }
          : {},
      ],
    },
    select: {
      id: true,
      isPublic: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });

  return (
    <div className='flex flex-col'>
      <Navbar title='Projects' />
      <ul className=' max-w-screen-xl w-full mx-auto mt-3 p-3 grow grid grid-cols-2 gap-3'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}
