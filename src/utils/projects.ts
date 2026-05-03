const LANGUAGE_DOT_CLASSES: Record<string, string> = {
  python: "bg-blue-700",
  typescript: "bg-blue-600",
  javascript: "bg-yellow-400",
  php: "bg-indigo-400",
};

export function getProjectLanguageDotClass(language: string | undefined): string {
  return LANGUAGE_DOT_CLASSES[(language || "").toLowerCase()] || "bg-slate-400";
}
