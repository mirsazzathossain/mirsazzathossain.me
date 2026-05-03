export type SnippetLanguageMeta = {
  label: string;
  glyph: string;
  glyphClassName: string;
};

const LANGUAGE_META: Record<string, SnippetLanguageMeta> = {
  python: { label: "Python", glyph: "py", glyphClassName: "text-blue-700 dark:text-blue-300" },
  bash: { label: "Bash", glyph: "$_", glyphClassName: "text-green-700 dark:text-green-300" },
  shell: { label: "Shell", glyph: "$_", glyphClassName: "text-green-700 dark:text-green-300" },
  javascript: { label: "JavaScript", glyph: "JS", glyphClassName: "text-yellow-600 dark:text-yellow-300" },
  typescript: { label: "TypeScript", glyph: "TS", glyphClassName: "text-blue-600 dark:text-blue-300" },
  latex: { label: "LaTeX", glyph: "TeX", glyphClassName: "text-green-800 dark:text-green-300" },
  yaml: { label: "YAML", glyph: "Y", glyphClassName: "text-red-700 dark:text-red-300" },
  sql: { label: "SQL", glyph: "SQL", glyphClassName: "text-amber-600 dark:text-amber-300" },
  rust: { label: "Rust", glyph: "Rs", glyphClassName: "text-orange-700 dark:text-orange-300" },
  cpp: { label: "C++", glyph: "C++", glyphClassName: "text-pink-600 dark:text-pink-300" },
  office: { label: "Office", glyph: "Off", glyphClassName: "text-orange-700 dark:text-orange-300" },
};

export function getSnippetLanguageMeta(language: string | undefined): SnippetLanguageMeta {
  const key = (language || "").toLowerCase();

  return (
    LANGUAGE_META[key] || {
      label: language || "Snippet",
      glyph: "</>",
      glyphClassName: "text-slate-500 dark:text-slate-300",
    }
  );
}
