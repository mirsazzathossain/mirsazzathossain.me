import fetcher from "utils/fetcher";
import Articles from "./Articles";
import Educations from "./Educations";
import Experiences from "./Experiences";
import LifeEvents from "./LifeEvents";
import Publications from "./Publications";

export default async function Server({
  component,
}: {
  component: string;
}): Promise<JSX.Element> {
  switch (component) {
    case "Educations":
      return (
        <Educations
          educations={await fetcher("http://localhost:3000/api/educations")}
        />
      );
    case "Experiences":
      return (
        <Experiences
          experiences={await fetcher("http://localhost:3000/api/experiences")}
        />
      );
    case "Publications":
      return (
        <Publications
          publications={await fetcher("http://localhost:3000/api/publications")}
        />
      );
    case "Articles":
      return (
        <Articles
          articles={await fetcher("http://localhost:3000/api/articles")}
        />
      );
    case "LifeEvents":
      return (
        <LifeEvents
          lifeEvents={await fetcher("http://localhost:3000/api/life-events")}
        />
      );
    default:
      return <></>;
  }
}
