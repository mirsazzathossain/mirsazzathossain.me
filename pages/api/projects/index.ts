import { promises as fs } from "fs";

async function getProjects(): Promise<any> {
  const res = await fs.readFile("content/projects.json", "utf-8");
  return JSON.parse(res);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (_: any, res: any): Promise<any> {
  const projects = await getProjects();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(projects);
}
