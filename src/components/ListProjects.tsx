import ProjectCard from "@/components/ProjectCard";

export default function ListProjects({
  projects,
}: {
  projects: Project[];
}): JSX.Element {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard as="li" project={project} key={project.title} />
      ))}
    </ul>
  );
}
