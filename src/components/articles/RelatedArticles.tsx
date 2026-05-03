import type { ArticleEntry } from "@/utils/articles";
import { Card } from "@/components/Card";

export default function RelatedArticles({
  articles,
}: {
  articles: ArticleEntry[];
}): JSX.Element {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Related Posts
      </h2>
      <div className="mt-6 flex max-w-3xl flex-col space-y-16">
        {articles.map((article) => (
          <article
            key={article.id}
            className="md:grid md:grid-cols-4 md:items-baseline"
          >
            <Card className="md:col-span-3">
              <Card.Title href={`/articles/${article.id}`}>
                {article.data.title}
              </Card.Title>
              <Card.Description>{article.data.description}</Card.Description>
              <Card.Cta>Read post</Card.Cta>
            </Card>
          </article>
        ))}
      </div>
    </div>
  );
}
