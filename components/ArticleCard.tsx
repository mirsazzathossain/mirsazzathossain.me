import { Article } from "contentlayer/generated";
import { Card } from "./Card";

export default function ArticleCard({
  article,
}: {
  article: Article;
}): JSX.Element {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={new Date(article.publishedAt as string).toLocaleString(
            "en-US",
            {
              month: "long",
              year: "numeric",
              day: "numeric",
            }
          )}
          className="md:hidden"
          decorate
        >
          {new Date(article.publishedAt as string).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
            day: "numeric",
          })}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={new Date(article.publishedAt as string).toLocaleString(
          "en-US",
          {
            month: "long",
            year: "numeric",
            day: "numeric",
          }
        )}
        className="mt-1 hidden md:block"
      >
        {new Date(article.publishedAt as string).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </Card.Eyebrow>
    </article>
  );
}
