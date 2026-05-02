"use client";

import ArticleCard from "@/components/ArticleCard";
import { Container } from "@/components/Container";
import type { ArticleEntry } from "@/utils/articles";
import { ChevronDownIcon } from "@/components/Icons";

export default function Articles({
  articles,
}: {
  articles: ArticleEntry[];
}) {
  return (
    <>
      {articles.length > 0 && (
        <Container className="mt-9">
          <div className="max-w-3xl">
            <h3 className="mb-6 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 md:text-4xl">
              Posts
            </h3>

            <div className="flex max-w-3xl flex-col space-y-16">
              {articles.slice(0, 2).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {articles.length > 2 && (
              <div className="mt-10 flex justify-center">
                <a
                  href="/articles"
                  className="group flex items-center text-sm font-medium text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                >
                  Show more
                  <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
                </a>
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
