import ArticleCard from "components/ArticleCard";
import { Article } from "contentlayer/generated";

export default function RelatedArticles({
  articles,
}: {
  articles: Article[];
}): JSX.Element {
  return (
    <>
      {articles.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
            Related Articles
          </h2>

          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article: any) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
