"use client";

import type { ArticleEntry } from "@/utils/articles";
import { useEffect, useMemo, useState } from "react";
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
  const pageArticles = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div>
      <SearchField
        value={query}
        onChange={setQuery}
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
        <div className="rounded border border-dashed border-rule bg-bg-2 p-8 text-center font-serif text-[15px] text-ink-3">
          No posts found.
        </div>
      )}

      {filtered.length > POSTS_PER_PAGE && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          label="Posts pagination"
        />
      )}
    </div>
  );
}
