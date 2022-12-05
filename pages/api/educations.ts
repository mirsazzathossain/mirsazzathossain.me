import { promises as fs } from "fs";

async function getEducations() {
  const educations = await fs.readFile("content/educations.json", "utf-8");
  return JSON.parse(educations);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: any, res: any) => {
  const educations = await getEducations();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(educations);
};
