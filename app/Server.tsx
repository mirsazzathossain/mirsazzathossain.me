import { server } from "config";
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
          educations={await fetch(`${server}/api/educations`).then((res) =>
            res.json()
          )}
        />
      );
    case "Experiences":
      return (
        <Experiences
          experiences={await fetch(`${server}/api/experiences`).then((res) =>
            res.json()
          )}
        />
      );
    case "Publications":
      return (
        <Publications
          publications={await fetch(`${server}/api/publications`).then((res) =>
            res.json()
          )}
        />
      );
    case "Articles":
      return (
        <Articles
          articles={await fetch(`${server}/api/articles`).then((res) =>
            res.json()
          )}
        />
      );
    case "LifeEvents":
      return (
        <LifeEvents
          lifeEvents={await fetch(`${server}/api/life-events`).then((res) =>
            res.json()
          )}
        />
      );
    default:
      return <></>;
  }
}
