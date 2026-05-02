/** ~200 wpm, same default as the `reading-time` package. */
export default function readingTime(text: string): { text: string } {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { text: `${minutes} min read` };
}
