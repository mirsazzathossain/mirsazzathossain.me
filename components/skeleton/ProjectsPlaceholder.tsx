import { ImageIcon } from "components/Icons";

export default function ProjectsPlaceholder() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {[...Array(6)].map((_, i) => (
        <li
          key={i}
          className="group relative flex flex-col items-start animate-pulse w-full"
        >
          <div className="-inset-y-6 -inset-x-4 sm:-inset-x-6 sm:rounded-2xl border-grey-200 dark:border-zinc-800 w-full">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <ImageIcon className="h-8 w-8 text-gray-200 dark:text-gray-600" />
            </div>

            <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mt-8"></div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-6"></div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>

            <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
