import { Snippet } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function SnipeetCard({ snippet }: { snippet: Snippet }) {
  return (
    <Link
      className="animate-background bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] shadow-lg transition [animation-duration:_6s] hover:shadow-sm rounded-xl p-0.5 w-full relative"
      href={`/snippets/${snippet.slug}`}
    >
      <div className="rounded-[10px] bg-white dark:bg-zinc-800 p-4 sm:p-6 h-full">
        <Image
          alt={snippet.logo.alt}
          height={32}
          width={32}
          src={`/images/${snippet.logo.url}`}
          className="rounded-xl"
        />
        <h3 className="text-lg font-bold text-left mt-2 text-zinc-800 dark:text-zinc-100 break-all">
          {snippet.title}
        </h3>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400 break-all">
          {snippet.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
            Snippet
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
            {snippet.language}
          </span>
        </div>
      </div>
    </Link>
  );
}
