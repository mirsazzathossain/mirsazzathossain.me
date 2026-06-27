export default async function fetcher(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
