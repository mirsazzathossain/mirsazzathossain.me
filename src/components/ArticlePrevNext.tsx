"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";

export default function ArticlePrevNext({
  previousId,
  nextId,
}: {
  previousId?: string;
  nextId?: string;
}): JSX.Element {
  return (
    <div className="my-2 grid grid-cols-2 gap-4">
      <a
        className="flex items-center text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
        href={previousId ? `/articles/${previousId}` : "#"}
      >
        <ArrowLeftIcon className="mr-2 w-5" />
        <p className="ml-2">Previous Post</p>
      </a>

      <a
        className="flex items-center justify-end text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
        href={nextId ? `/articles/${nextId}` : "#"}
      >
        <span className="mr-2">Next Post</span>
        <ArrowRightIcon className="ml-2 w-5" />
      </a>
    </div>
  );
}
