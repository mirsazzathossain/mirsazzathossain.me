"use client";

import { useMemo, useState } from "react";

import ProjectCard from "@/components/projects/ProjectCard";

const PROJECT_TYPE_ORDER = ["Research", "Course", "Hobby", "Tool", "Other"];

export default function ListProjects({
  projects,
}: {
  projects: Project[];
}): JSX.Element {
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
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-3">
            Type
          </span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setType(filter)}
              className={
                type === filter
                  ? "rounded border border-ink bg-ink px-3 py-1 text-[11px] font-mono text-bg transition-colors"
                  : "rounded border border-rule bg-bg px-3 py-1 text-[11px] font-mono text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="m-0 font-mono text-[11px] text-ink-3">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <ul
        role="list"
        className="m-0 grid list-none gap-[14px] p-0 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]"
      >
        {filteredProjects.map((project) => (
          <li key={project.title} className="min-w-0">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {filteredProjects.length === 0 && (
        <div className="mt-6 rounded-[10px] border border-dashed border-rule bg-bg-2 p-6 text-center font-serif text-[15px] text-ink-3">
          No projects match this type.
        </div>
      )}
    </div>
  );
}
