import type { ArticleEntry } from "@/utils/articles";
import { Card } from "./Card";

export default function ArticleCard({
  article,
}: {
  article: ArticleEntry;
}): JSX.Element {
  const published = article.data.publishedAt
    ? new Date(article.data.publishedAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
        day: "numeric",
      })
    : "";

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.id}`}>
          {article.data.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={published}
          className="md:hidden"
          decorate
        >
          {published}
        </Card.Eyebrow>
        <Card.Description>{article.data.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={published}
        className="mt-1 hidden md:block"
      >
        {published}
      </Card.Eyebrow>
    </article>
  );
}
