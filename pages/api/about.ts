import { promises as fs } from "fs";

async function getAbout() {
  const about = await fs.readFile("content/about.json", "utf-8");
  return JSON.parse(about);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: any, res: any) => {
  const about = await getAbout();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(about);
};
