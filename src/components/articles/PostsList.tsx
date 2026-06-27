"use client";

import type { ArticleEntry } from "@/utils/articles";
import { useMemo, useState } from "react";
import { ArticleListItem } from "@/components/articles/ArticleListItem";
import { Pagination } from "@/components/ui/Pagination";
import { SearchField } from "@/components/ui/SearchField";

const POSTS_PER_PAGE = 20;

export default function PostsList({
  articles,
  initialPage = 1,
}: {
  articles: ArticleEntry[];
  initialPage?: number;
}): JSX.Element {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(initialPage);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return articles;

    return articles.filter((article) => {
      const haystack = [
        article.data.title,
        article.data.description,
        ...(article.data.tags?.map((tag) => tag.title) ?? []),
        ...article.data.categories.map((category) => category.title),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [articles, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageArticles = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const handleQueryChange = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  return (
    <div>
      <SearchField
        value={query}
        onChange={handleQueryChange}
        placeholder="Search posts..."
        label="Search posts"
        className="mb-[22px] max-w-[360px]"
      />

      <ul className="m-0 list-none p-0">
        {pageArticles.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="border-rule bg-bg-2 text-ink-3 rounded border border-dashed p-8 text-center font-serif text-[15px]">
          No posts found.
        </div>
      )}

      {filtered.length > POSTS_PER_PAGE && (
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          label="Posts pagination"
        />
      )}
    </div>
  );
}
