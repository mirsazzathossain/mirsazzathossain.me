type Props = { language?: string; color?: string };

export default function LangBadge({ language, color }: Props) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center text-sm text-zinc-500 dark:text-zinc-400">
      <span
        aria-hidden
        className="mr-2 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color || "#94a3b8" }}
      />
      <span>{language}</span>
    </span>
  );
}
