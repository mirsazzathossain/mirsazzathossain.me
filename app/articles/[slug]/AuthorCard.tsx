import { Article } from "contentlayer/generated";
import Image from "next/image";

export default function AuthorCard({
  article,
}: {
  article: Article;
}): JSX.Element {
  return (
    <div className="px-8 py-8 mt-12 text-zinc-600 dark:text-zinc-400 rounded-2xl bg-gray-100 dark:bg-zinc-800">
      <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap">
        <div className="relative flex-shrink-0 w-24 h-24 mt-1 ">
          <span>
            <Image
              alt={article.author.name}
              sizes="100vw"
              src={`/images/${article.author.avatar.url}`}
              width={30}
              height={30}
              className="rounded-full absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover"
            />
          </span>
        </div>
        <div>
          <div className="mb-3">
            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
              About {article.author.name}
            </h4>
          </div>
          <div>
            <p>
              Mir Sazzat Hossain is a Research Assistant at the Independent
              University of Bangladesh's Center for Computation and Data Science
              (CCDS).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
