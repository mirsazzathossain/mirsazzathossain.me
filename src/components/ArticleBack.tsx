"use client";

import { ArrowLeftIcon } from "@/components/Icons";

export default function ArticleBack({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => history.back()}
      className={className}
    >
      <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
    </button>
  );
}
