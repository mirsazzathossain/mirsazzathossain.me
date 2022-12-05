import { promises as fs } from "fs";

async function getLifeEvents() {
  const lifeEvents = await fs.readFile("content/life_events.json", "utf-8");
  return JSON.parse(lifeEvents);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: any, res: any) => {
  const lifeEvents = await getLifeEvents();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(lifeEvents);
};
