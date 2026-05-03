"use client";

import type { ArticleEntry } from "@/utils/articles";
import readingTime from "@/utils/reading-time";
import { slugify } from "@/utils/slugify";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";

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
      <label className="mb-[22px] inline-flex w-full max-w-[360px] items-center gap-[7px] rounded-full border border-rule bg-bg px-3 py-1.5 text-ink-3">
        <SearchIcon className="h-[13px] w-[13px] shrink-0" />
        <span className="sr-only">Search posts</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts..."
          className="w-full border-0 bg-transparent font-sans text-[13px] text-ink outline-none placeholder:text-ink-3"
        />
      </label>

      <ul className="m-0 list-none p-0">
        {pageArticles.map((article) => {
          const published = article.data.publishedAt
            ? new Date(article.data.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "";
          const rt = readingTime(article.body);

          return (
            <li key={article.id} className="border-b border-rule-2 py-6 first:pt-0">
              <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-ink-3">
                <span>{published}</span>
                <span aria-hidden="true">·</span>
                <span>{rt.text}</span>
              </div>
              <h2 className="m-0 mb-1.5 font-serif text-[22px] font-semibold leading-[1.25] tracking-[-0.015em]">
                <a
                  href={`/articles/${article.id}`}
                  className="text-ink transition-colors hover:text-link hover:no-underline"
                >
                  {article.data.title}
                </a>
              </h2>
              <p className="m-0 mb-2.5 line-clamp-2 max-w-[70ch] text-[13.5px] leading-[1.6] text-ink-2">
                {article.data.description}
              </p>
              <div className="flex flex-wrap gap-[5px]">
                {article.data.categories.slice(0, 1).map((category) => (
                  <a
                    key={`category-${category.title}`}
                    href={`/articles/categories/${slugify(category.title)}`}
                    className="whitespace-nowrap rounded border border-link/25 bg-accent-soft px-[7px] py-[2px] font-mono text-[10.5px] text-link transition-colors hover:border-link/40 hover:no-underline"
                  >
                    {category.title}
                  </a>
                ))}
                {article.data.tags?.slice(0, 3).map((tag) => (
                  <a
                    key={`tag-${tag.title}`}
                    href={`/articles/tags/${slugify(tag.title)}`}
                    className="whitespace-nowrap rounded border border-rule bg-bg-2 px-[7px] py-[2px] font-mono text-[10.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link hover:no-underline"
                  >
                    {tag.title}
                  </a>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <div className="rounded border border-dashed border-rule bg-bg-2 p-8 text-center font-serif text-[15px] text-ink-3">
          No posts found.
        </div>
      )}

      {filtered.length > POSTS_PER_PAGE && (
        <nav
          className="mt-4 flex items-center justify-between gap-3 border-t border-rule pt-4"
          aria-label="Posts pagination"
        >
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded border border-rule bg-bg px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeftIcon />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={pageNumber === page ? "page" : undefined}
                  className={
                    pageNumber === page
                      ? "h-8 min-w-8 rounded border border-ink bg-ink px-2 font-mono text-[11.5px] text-bg"
                      : "h-8 min-w-8 rounded border border-rule bg-bg px-2 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link"
                  }
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded border border-rule bg-bg px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link disabled:pointer-events-none disabled:opacity-40"
          >
            <span>Next</span>
            <ArrowRightIcon />
          </button>
        </nav>
      )}
    </div>
  );
}

