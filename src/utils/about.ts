export type LogoInfo =
  | { kind: "img"; src: string; alt: string }
  | { kind: "text"; label: string };

export function getOrgLogo(name: string): LogoInfo {
  if (name.includes("CCDS") || name.includes("Center for Computational")) {
    return { kind: "img", src: "/images/logos/ccds.png", alt: "CCDS" };
  }
  if (name.includes("IUB") || name.includes("Independent University")) {
    return { kind: "img", src: "/images/logos/iub.png", alt: "IUB" };
  }
  if (name.includes("Postex") || name.includes("Penta")) {
    return { kind: "img", src: "/images/logos/penta-global.png", alt: "Penta Global" };
  }

  const words = name.trim().split(/\s+/);
  const label =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 3).toUpperCase();

  return { kind: "text", label };
}

export function getTalkTypeClass(type: string): string {
  if (type === "oral") return "bg-accent-soft text-link";
  if (type === "poster") return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
  if (type === "workshop") return "bg-pink-50 text-pink-800 dark:bg-pink-950 dark:text-pink-300";
  return "bg-bg-2 text-ink-3";
}

export function getTimelineKindClass(kind: string): string {
  if (kind === "paper") return "bg-accent-soft text-link";
  if (kind === "award") return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
  if (kind === "career") return "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
  return "bg-slate-100 text-ink-2 dark:bg-bg-3";
}

export function getNewsTagFromTitle(title: string): { label: string; className: string } {
  const lower = title.toLowerCase();

  if (lower.includes("paper")) return { label: "paper", className: "bg-accent-soft text-link" };
  if (lower.includes("grant") || lower.includes("award")) {
    return { label: "award", className: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" };
  }
  if (lower.includes("working") || lower.includes("role")) {
    return { label: "career", className: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" };
  }
  if (lower.includes("talk") || lower.includes("presentation")) {
    return { label: "talk", className: "bg-pink-50 text-pink-800 dark:bg-pink-950 dark:text-pink-300" };
  }

  return { label: "milestone", className: "bg-bg-3 text-ink-2" };
}

export function stripEmoji(text: string): string {
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    "",
  );
}
