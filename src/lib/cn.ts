/** Tiny className joiner — replaces `clsx` for string/varargs-only usage. */
export function cn(
  ...parts: Array<string | number | false | null | undefined>
): string {
  return parts.filter((p) => p !== false && p != null && p !== "").join(" ");
}
