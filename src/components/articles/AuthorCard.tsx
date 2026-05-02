import type { ArticleEntry } from "@/utils/articles";

export default function AuthorCard({
  article,
}: {
  article: ArticleEntry;
}): JSX.Element {
  const { author } = article.data;
  const authorUrl = author.url ?? "#";

  return (
    <div className="mt-12 rounded-2xl bg-gray-100 px-8 py-8 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 shrink-0 ">
          <span>
            <img
              alt={author.name}
              src={`/images/${author.avatar.url}`}
              width={30}
              height={30}
              className="absolute inset-0 m-auto box-border block h-0 min-h-full w-0 min-w-full max-h-full max-w-full rounded-full border-none object-cover p-0"
              loading="lazy"
              decoding="async"
            />
          </span>
        </div>
        <div>
          <div className="mb-3">
            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
              About{" "}
              <a className="text-teal-600 hover:underline dark:text-teal-400" href={authorUrl}>
                {author.name}
              </a>
            </h4>
          </div>
          <div>
            <p className="text-justify">
              <a className="text-teal-600 hover:underline dark:text-teal-400" href={authorUrl}>
                {" "}
                Mir Sazzat Hossain
              </a>{" "}
              is a Junior Research Scientist working at the Independent
              University of Bangladesh&apos;s Center for Computation and Data
              Science (CCDS).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
