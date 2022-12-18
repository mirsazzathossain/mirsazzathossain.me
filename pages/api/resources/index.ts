import { promises as fs } from "fs";

async function getResources(): Promise<any> {
  const resources = await fs.readFile("content/resources.json", "utf-8");
  return JSON.parse(resources);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: any, res: any): Promise<any> => {
  const resources = await getResources();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(resources);
};
