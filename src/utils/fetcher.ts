export default async function fetcher(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  return res.json();
}
