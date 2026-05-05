import { getHostnameLabel } from "@/utils/url";

const LANGUAGE_DOT_CLASSES: Record<string, string> = {
  python: "bg-blue-700",
  typescript: "bg-blue-600",
  javascript: "bg-yellow-400",
  php: "bg-indigo-400",
};

export function getProjectLanguageDotClass(language: string | undefined): string {
  return LANGUAGE_DOT_CLASSES[(language || "").toLowerCase()] || "bg-slate-400";
}

export type ProjectLinkMeta = {
  href: string;
  host: string;
  label: string;
  kind: "github" | "drive" | "external";
};

export function getProjectLinkMeta(project: Project): ProjectLinkMeta {
  const href = project.link?.href ?? "";
  let host = "";

  try {
    host = new URL(href).hostname;
  } catch {
    host = "";
  }

  const bare = host.replace(/^www\./, "");
  const kind = bare === "github.com"
    ? "github"
    : bare === "drive.google.com" || bare === "docs.google.com"
      ? "drive"
      : "external";

  return {
    href,
    host,
    kind,
    label: project.link?.label || getProjectLinkLabel(href, host, kind),
  };
}

function getProjectLinkLabel(
  href: string,
  host: string,
  kind: ProjectLinkMeta["kind"]
): string {
  try {
    const url = new URL(href);

    if (kind === "github") {
      const parts = url.pathname.split("/").filter(Boolean);
      return parts.slice(-2).join("/") || url.pathname || host;
    }

    return getHostnameLabel(url.href);
  } catch {
    return href || "External";
  }
}
