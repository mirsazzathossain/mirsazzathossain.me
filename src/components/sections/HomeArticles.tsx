import { ArticleListItem } from "@/components/articles/ArticleListItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ArticleEntry } from "@/utils/articles";

export function HomeArticles({ articles }: { articles: ArticleEntry[] }) {
  const recentArticles = articles.slice(0, 2);

  if (recentArticles.length === 0) return null;

  return (
    <div className="mb-10">
      <SectionHeader title="From the blog" href="/articles" action="All posts" />
      
      <ul className="list-none p-0 m-0">
        {recentArticles.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article}
            dateStyle="short"
            showTaxonomy={false}
          />
        ))}
      </ul>
    </div>
  );
}
