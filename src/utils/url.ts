export function getHostnameLabel(url: string, fallback = "External"): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return fallback;
  }
}
