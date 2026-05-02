"use client";

import ArticleCard from "@/components/ArticleCard";
import type { ArticleEntry } from "@/utils/articles";
import { MagnifyingGlassIcon, NotFoundIcon } from "@/components/Icons";
import { useMemo, useState } from "react";

/** Mirrors Astro `page` pagination prop (client-safe; avoid importing `astro` in the bundle). */
export type ArticleListPage = {
  data: ArticleEntry[];
  currentPage: number;
  lastPage: number;
  total: number;
  url: {
    current: string;
    next?: string;
    prev?: string;
    first?: string;
    last?: string;
  };
};

const linkBase =
  "px-3 py-2 ml-0 leading-tight text-zinc-800 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-zinc-200 dark:hover:bg-gray-700 dark:hover:text-white";
const activeLink =
  "bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white";
const prevCls = `${linkBase} rounded-l-lg`;
const nextCls = `${linkBase} rounded-r-lg`;
const disabled = "cursor-not-allowed opacity-50 pointer-events-none";

function pageHref(base: string, n: number): string {
  if (n <= 1) return base;
  return `${base}/${n}`;
}

function PaginationNav({
  page,
  base,
}: {
  page: ArticleListPage;
  base: string;
}): JSX.Element {
  return (
    <nav aria-label="Pagination" className="inline-flex -space-x-px flex-wrap justify-center gap-y-1">
      {page.url.prev ? (
        <a href={page.url.prev} className={prevCls}>
          Previous
        </a>
      ) : (
        <span className={`${prevCls} ${disabled}`} aria-disabled="true">
          Previous
        </span>
      )}
      {Array.from({ length: page.lastPage }, (_, i) => {
        const n = i + 1;
        const href = pageHref(base, n);
        const isActive = n === page.currentPage;
        return (
          <a
            key={n}
            href={href}
            className={`${linkBase} ${isActive ? activeLink : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {n}
          </a>
        );
      })}
      {page.url.next ? (
        <a href={page.url.next} className={nextCls}>
          Next
        </a>
      ) : (
        <span className={`${nextCls} ${disabled}`} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}

export default function SearchArticles({
  allArticles,
  page,
  paginationBase,
}: {
  allArticles: ArticleEntry[];
  page: ArticleListPage;
  paginationBase: string;
}): JSX.Element {
  const [searchValue, setSearchValue] = useState("");

  const filtered = useMemo(() => {
    if (searchValue.length === 0) return null;
    const q = searchValue.toLowerCase();
    return allArticles.filter((article) => {
      const title = article.data.title.toLowerCase();
      const description = article.data.description.toLowerCase();
      return title.includes(q) || description.includes(q);
    });
  }, [allArticles, searchValue]);

  const searching = filtered !== null;
  const displayArticles = searching ? filtered : page.data;
  const totalArticles = searching ? filtered.length : page.total;
  const showPagination = !searching && page.lastPage > 1;

  return (
    <>
      <div className="relative mb-12 max-w-3xl sm:mb-16">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search articles"
          className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-zinc-800/90 dark:text-zinc-400"
        />

        <MagnifyingGlassIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {displayArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      {totalArticles === 0 && (
        <div className="grid h-[20vh] max-w-3xl content-center space-y-16">
          <div className="text-center">
            <NotFoundIcon className="mx-auto h-20 w-20 text-gray-500 dark:text-gray-400" />
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No articles found.
            </p>

            <p className="text-gray-500 dark:text-gray-400">
              Try searching for something else.
            </p>
          </div>
        </div>
      )}
      {totalArticles !== 0 && showPagination && (
        <div className="mt-16 grid max-w-3xl justify-items-center">
          <PaginationNav page={page} base={paginationBase} />
        </div>
      )}
    </>
  );
}
