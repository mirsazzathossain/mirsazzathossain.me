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
          educations={await fetch("http://localhost:3000/api/educations").then(
            (res) => res.json()
          )}
        />
      );
    case "Experiences":
      return (
        <Experiences
          experiences={await fetch(
            "http://localhost:3000/api/experiences"
          ).then((res) => res.json())}
        />
      );
    case "Publications":
      return (
        <Publications
          publications={await fetch(
            "http://localhost:3000/api/publications"
          ).then((res) => res.json())}
        />
      );
    case "Articles":
      return (
        <Articles
          articles={await fetch("http://localhost:3000/api/articles").then(
            (res) => res.json()
          )}
        />
      );
    case "LifeEvents":
      return (
        <LifeEvents
          lifeEvents={await fetch("http://localhost:3000/api/life-events").then(
            (res) => res.json()
          )}
        />
      );
    default:
      return <></>;
  }
}
