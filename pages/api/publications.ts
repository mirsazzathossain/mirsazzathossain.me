import { BibtexParser } from "bibtex-js-parser";
import { promises as fs } from "fs";

async function getPublications() {
  const bibtex = await fs.readFile("content/publications.bib", "utf-8");
  const publications = BibtexParser.parseToJSON(bibtex);

  return publications;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: any, res: any) => {
  const lifeEvents = await getPublications();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(lifeEvents);
};
