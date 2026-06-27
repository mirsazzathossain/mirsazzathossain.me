"use client";

import { useMemo, useState } from "react";

import ProjectCard from "@/components/projects/ProjectCard";

const PROJECT_TYPE_ORDER = ["Research", "Course", "Hobby", "Tool", "Other"];

export default function ListProjects({ projects }: { projects: Project[] }): JSX.Element {
  const [type, setType] = useState("All");

  const normalizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        type: project.type?.trim() || "Other",
      })),
    [projects],
  );

  const filters = useMemo(() => {
    const present = new Set(normalizedProjects.map((project) => project.type));

    return ["All", ...PROJECT_TYPE_ORDER.filter((item) => present.has(item))];
  }, [normalizedProjects]);

  const filteredProjects = useMemo(
    () =>
      type === "All"
        ? normalizedProjects
        : normalizedProjects.filter((project) => project.type === type),
    [normalizedProjects, type],
  );

  return (
    <div>
      <div className="border-rule mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.1em] uppercase">
            Type
          </span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setType(filter)}
              className={
                type === filter
                  ? "border-ink bg-ink text-bg rounded border px-3 py-1 font-mono text-[11px] transition-colors"
                  : "border-rule bg-bg text-ink-2 hover:border-ink-3 hover:text-ink rounded border px-3 py-1 font-mono text-[11px] transition-colors"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="text-ink-3 m-0 font-mono text-[11px]">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <ul className="m-0 grid list-none [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))] gap-[14px] p-0">
        {filteredProjects.map((project) => (
          <li key={project.title} className="min-w-0">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {filteredProjects.length === 0 && (
        <div className="border-rule bg-bg-2 text-ink-3 mt-6 rounded-[10px] border border-dashed p-6 text-center font-serif text-[15px]">
          No projects match this type.
        </div>
      )}
    </div>
  );
}
