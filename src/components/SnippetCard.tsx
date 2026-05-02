"use client";

import type { SnippetEntry } from "@/utils/articles";
import React from "react";

export default function SnippetCard({
  snippet,
}: {
  snippet: SnippetEntry;
}): JSX.Element {
  const [isImageLoading, setImageLoading] = React.useState(true);
  return (
    <a
      className="animate-background relative w-full rounded-xl bg-linear-to-r from-green-300 via-blue-500 to-purple-600 bg-size-[400%_400%] p-0.5 shadow-lg transition [animation-duration:6s] hover:shadow-xs"
      href={`/snippets/${snippet.id}`}
    >
      <div className="h-full rounded-[10px] bg-white p-4 dark:bg-zinc-800 sm:p-6">
        <img
          alt={snippet.data.logo.alt}
          height={32}
          width={32}
          src={`/images/${snippet.data.logo.url}`}
          onLoad={() => setImageLoading(false)}
          className={`${
            isImageLoading
              ? "blur-xs transition duration-100 ease-in"
              : "blue-none transition duration-100 ease-in"
          } rounded-xl`}
        />
        <h3 className="mt-2 break-all text-left text-lg font-bold text-zinc-800 dark:text-zinc-100">
          {snippet.data.title}
        </h3>
        <p className="mt-1 break-all text-zinc-600 dark:text-zinc-400">
          {snippet.data.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
            Snippet
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
            {snippet.data.language}
          </span>
        </div>
      </div>
    </a>
  );
}
