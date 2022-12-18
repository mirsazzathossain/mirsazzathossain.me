import { Snippet } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function SnipeetCard({ snippet }: { snippet: Snippet }) {
  return (
    <Link
      className="border border-grey-200 dark:border-zinc-800 rounded-xl p-4 w-full relative"
      href={`/snippets/${snippet.slug}`}
    >
      <span className="absolute w-[40%] -bottom-px right-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>
      <span className="absolute w-px -left-px h-[40%] bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>
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
    </Link>
  );
}
