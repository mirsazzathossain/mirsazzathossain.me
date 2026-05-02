import { AnchorIcon } from "./Icons";

export default function ResourceCard({
  resource,
}: {
  resource: Resource;
}): JSX.Element {
  return (
    <a
      href={resource.url}
      className="animate-background relative w-full rounded-xl bg-linear-to-r from-green-300 via-blue-500 to-purple-600 bg-size-[400%_400%] p-0.5 shadow-lg transition [animation-duration:6s] hover:shadow-xs"
      target="_blank"
      rel="noreferrer"
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
    </a>
  );
}
