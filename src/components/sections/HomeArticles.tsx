import React from 'react';
import type { ArticleEntry } from "@/utils/articles";

export function HomeArticles({ articles }: { articles: ArticleEntry[] }) {
  const recentArticles = articles.slice(0, 2);

  if (recentArticles.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between pb-2 border-b border-rule mb-4 gap-3 flex-wrap">
        <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 font-semibold m-0">From the blog</h2>
        <a className="font-mono text-[11.5px] text-link inline-flex items-center gap-1 whitespace-nowrap hover:underline hover:decoration-link/35 hover:underline-offset-[3px]" href="/articles">
          All posts <span className="text-current transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
      
      <ul className="list-none p-0 m-0">
        {recentArticles.map((article) => {
          const published = article.data.publishedAt
            ? new Date(article.data.publishedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "";
            
          return (
            <li key={article.id} className="py-6 border-b border-rule-2 first:pt-0 last:border-b-0">
              <div className="font-mono text-[11px] text-ink-3 mb-1.5 flex gap-2 items-center tracking-[0.04em]">
                <span>{published}</span>
                <span>·</span>
                <span>12 min read</span>
              </div>
              <h3 className="font-serif text-[22px] leading-[1.25] m-0 mb-1.5 tracking-[-0.015em] font-semibold">
                <a href={`/articles/${article.id}`} className="text-ink hover:text-link hover:underline hover:decoration-link/35 hover:underline-offset-[3px]">
                  {article.data.title}
                </a>
              </h3>
              <p className="text-[13.5px] text-ink-2 m-0 mb-2.5 max-w-[70ch] leading-[1.6] line-clamp-2">
                {article.data.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
