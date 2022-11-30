import { SVGProps } from "react";

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PublicationCard({
  publication,
}: {
  publication: {
    title: string;
    date: string;
    description: React.ReactNode;
    codeURL: string;
    paperURL: string;
  };
}): JSX.Element {
  return (
    <article className="group relative flex flex-col items-start">
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
      <h2 className="relative z-10 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        <a href="/articles/crafting-a-design-system-for-a-multiplanetary-future">
          Crafting a design system for a multiplanetary future
        </a>
      </h2>
      <time
        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
        dateTime="2022-09-05"
      >
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
        September 5, 2022
      </time>

      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Most companies try to stay ahead of the curve when it comes to visual
        design, but for Planetaria we needed to create a brand that would still
        inspire us 100 years from now when humanity has spread across our entire
        solar system.
      </p>
      <div
        aria-hidden="true"
        className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
      >
        Read article
        <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
      </div>
    </article>
  );
}
