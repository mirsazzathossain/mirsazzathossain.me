"use client";
import { ArrowLeftIcon } from "components/Icons";
import mdxComponents from "components/mdx/MdxComponent";
import { Snippet } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SnippetPage({
  snippet,
}: {
  snippet: Snippet;
}): JSX.Element {
  const router = useRouter();

  const Component = useMDXComponent(snippet.body.code);
  return (
    <div className="xl:relative">
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
        </button>
        <article>
          <div className="flex justify-between w-full mb-8">
            <header>
              <h1 className="font-bold text-3xl sm:text-4xl tracking-tight mb-4 text-zinc-800 dark:text-zinc-100">
                {snippet.title}
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                {snippet.description}
              </p>
            </header>
            <div className="mt-0 sm:mt-2">
              <Image
                alt={snippet.logo.alt}
                height={48}
                width={48}
                src={`/images/${snippet.logo.url}`}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="mt-8 prose dark:prose-invert">
            <Component components={mdxComponents as any} />
          </div>
        </article>
      </div>
    </div>
  );
}
