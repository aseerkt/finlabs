import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { visibility: 'PUBLIC' },
  });

  return (
    <div>
      {projects.map((project) => (
        <article key={project.id}>
          <h1>{project.name}</h1>
        </article>
      ))}
    </div>
  );
}
