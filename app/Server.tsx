import { BibtexParser } from "bibtex-js-parser";
import { allArticles } from "contentlayer/generated";
import { promises as fs } from "fs";
import Articles from "./Articles";
import Educations from "./Educations";
import Experiences from "./Experiences";
import LifeEvents from "./LifeEvents";
import Publications from "./Publications";

// get educations from the local file
async function getEducations(): Promise<any> {
  const educations = await fs.readFile("content/educations.json", "utf-8");
  return JSON.parse(educations);
}

// get experiences from the local file
async function getExperiences(): Promise<any> {
  const experiences = await fs.readFile("content/experiences.json", "utf-8");
  return JSON.parse(experiences);
}

// get publications from the local bibliography file
async function getPublications(): Promise<any> {
  const bibtex = await fs.readFile("content/publications.bib", "utf-8");
  const publications = BibtexParser.parseToJSON(bibtex);
  return publications;
}

// get life events from the local file
async function getLifeEvents(): Promise<any> {
  const lifeEvents = await fs.readFile("content/life_events.json", "utf-8");
  return JSON.parse(lifeEvents);
}

// get sorted articles from the contentlayer
async function getSortedArticles(): Promise<any> {
  let articles = await allArticles;
  articles = articles.filter((article: any) => article.status === "published");
  return articles.sort((a: any, b: any) => {
    if (a.publishedAt && b.publishedAt) {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    return 0;
  });
}

export default async function Server({
  component,
}: {
  component: string;
}): Promise<JSX.Element> {
  switch (component) {
    case "Educations":
      return <Educations educations={await getEducations()} />;
    case "Experiences":
      return <Experiences experiences={await getExperiences()} />;
    case "Publications":
      return <Publications publications={await getPublications()} />;
    case "Articles":
      return <Articles articles={await getSortedArticles()} />;
    case "LifeEvents":
      return <LifeEvents lifeEvents={await getLifeEvents()} />;
    default:
      return <></>;
  }
}
