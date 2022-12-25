import { allSnippets } from "contentlayer/generated";

async function getSnippet(slug: string): Promise<any> {
  const res = await allSnippets;
  const snippet = res.filter((s: any) => s.slug === slug);

  if (!snippet || snippet.length === 0) {
    return null;
  }

  return JSON.parse(JSON.stringify(snippet[0]));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any): Promise<any> => {
  const { slug } = req.query;
  const snippet = await getSnippet(slug);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json(snippet);
};
