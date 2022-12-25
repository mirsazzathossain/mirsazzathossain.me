import { allSnippets } from "contentlayer/generated";

async function getSnippets(): Promise<any> {
  const res = await allSnippets;
  return JSON.parse(JSON.stringify(res));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any): Promise<any> => {
  const snippets = await getSnippets();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(snippets);
};
