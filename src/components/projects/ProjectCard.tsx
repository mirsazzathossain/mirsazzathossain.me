"use client";

import { DriveIcon, GitHubIcon, LinkIcon } from "@/components/Icons";
import { getProjectLanguageDotClass } from "@/utils/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.link?.href ?? "";
  let host = "";
  try {
    host = new URL(href).hostname;
  } catch (e) {
    host = "";
  }

  let label = project.link?.label ?? "";
  if (!label) {
    try {
      const url = new URL(href);
      if (host.includes("github.com")) {
        const parts = url.pathname.split("/").filter(Boolean);
        label = parts.slice(-2).join("/") || url.pathname || host;
      } else {
        label = url.hostname.replace("www.", "");
      }
    } catch (e) {
      label = href || "External";
    }
  }

  const Icon = host.includes("github.com")
    ? GitHubIcon
    : host.includes("drive.google.com") || host.includes("docs.google.com")
      ? DriveIcon
      : LinkIcon;

  return (
    <a
      href={href}
      className="group flex w-full flex-col gap-2.5 rounded-[var(--r-lg)] border border-rule bg-bg p-[16px_18px] text-ink no-underline transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-3 hover:no-underline"
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title} — ${label}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md border border-rule bg-bg-2 text-sm">
          {project.glyph}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[13.5px] font-semibold text-ink">
          {project.title}
        </span>
        <span className="ml-auto inline-flex items-center gap-[3px] font-mono text-[11px] text-ink-3">
          ★ {project.stars ?? 0}
        </span>
      </div>

      <p className="m-0 min-h-[calc(1.55em*3)] max-h-[calc(1.55em*3)] overflow-hidden text-[13px] leading-[1.55] text-ink-2 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags?.map((tag: string, i: number) => (
          <span
            key={i}
            className="inline-block rounded-full border border-rule bg-bg-3 px-2 py-[3px] font-mono text-[11px] text-ink-2 hover:bg-bg-2"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-rule-2 pt-2 font-mono text-[11px] text-ink-3">
        <span
          className={`inline-block h-[9px] w-[9px] rounded-full ${getProjectLanguageDotClass(project.language)}`}
        />
        <span>{project.language}</span>
        <span className="ml-auto inline-flex items-center gap-1 text-ink-3 group-hover:text-link">
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </span>
      </div>
    </a>
  );
}
