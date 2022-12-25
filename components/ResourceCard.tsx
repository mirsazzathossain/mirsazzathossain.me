import Link from "next/link";
import { AnchorIcon } from "./Icons";

export default function ResourceCard({
  resource,
}: {
  resource: Resource;
}): JSX.Element {
  return (
    <Link
      href={resource.url}
      className="animate-background bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] shadow-lg transition [animation-duration:_6s] hover:shadow-sm rounded-xl p-0.5 w-full relative"
      target="__blank"
    >
      <div className="rounded-[10px] bg-white dark:bg-zinc-800 p-4 sm:p-6 h-full">
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
      </div>
    </Link>
  );
}
