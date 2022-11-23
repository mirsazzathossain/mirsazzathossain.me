import { Popover, Transition } from "@headlessui/react";
import Link from "next/dist/client/link";
import { Fragment, Key } from "react";
import { UrlObject } from "url";

export default function MobileNavigation({
  links,
}: {
  links: { id: Key; title: string; href: string | UrlObject }[];
}): JSX.Element {
  return (
    <Popover as={"div"} className="pointer-events-auto md:hidden">
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <svg
          viewBox="0 0 8 6"
          aria-hidden="true"
          className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
        >
          <path
            d="M1.75 1.75 4 4.25l2.25-2.5"
            fill="none"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </Popover.Button>

      <Transition>
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button className="-m-1 p-1">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                >
                  <path
                    d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Popover.Button>

              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link className="block py-2" href={link.href}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition>
    </Popover>
  );
}
