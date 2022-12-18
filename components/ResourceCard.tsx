import Link from "next/link";
import { AnchorIcon } from "./Icons";

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={resource.url}
      className="border border-grey-200 dark:border-zinc-800 rounded-xl p-4 w-full relative"
      target="__blank"
    >
      <span className="absolute w-[40%] -bottom-px right-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>
      <span className="absolute w-px -left-px h-[40%] bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>

      <div className="flex items-center text-zinc-600 dark:text-zinc-400">
        <span className="mt-1 text-zinc-400 dark:text-zinc-200 inline-block break-all">
          {new URL(resource.url).hostname.replace("www.", "")}
        </span>
        <AnchorIcon className="h-4 w-4 ml-1 mt-1.5" />
      </div>

      <h3 className="text-lg font-bold text-left mt-2 text-zinc-800 dark:text-zinc-100 break-all">
        {resource.title}
      </h3>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400 break-all">
        {resource.description}
      </p>
    </Link>
  );
}
