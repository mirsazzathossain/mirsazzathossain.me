import ProjectCard from "components/ProjectCard";
import { server } from "config";
import fs, { promises as ps } from "fs";

// get projects from local file
async function getListProjects(): Promise<Project[]> {
  if (fs.existsSync("public/content/projects.json")) {
    const res = await ps.readFile("public/content/projects.json", "utf-8");
    const projects: Project[] = JSON.parse(res);
    return projects;
  }

  const projects = fetch(`${server}/content/projects.json`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return projects;
}

export default async function ListProjects(): Promise<JSX.Element> {
  const projects: Project[] = await getListProjects();
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
