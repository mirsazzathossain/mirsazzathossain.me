import { promises as fs } from "fs";

async function getExperiences() {
  const experiences = await fs.readFile("content/experiences.json", "utf-8");
  return JSON.parse(experiences);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: any, res: any) => {
  const experiences = await getExperiences();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(experiences);
};
