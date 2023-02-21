"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ReactPaginate from "react-paginate";

export default function Pagination({
  totalArticles,
}: {
  totalArticles: number;
}): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalArticles / 5);
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  return (
    <ReactPaginate
      containerClassName={"inline-flex -space-x-px"}
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakLinkClassName={
        "px-3 py-2 ml-0 leading-tight text-zinc-800 bg-white/90 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-800/90 dark:border-gray-700 dark:text-zinc-200 dark:hover:bg-gray-700 dark:hover:text-white"
      }
      activeLinkClassName={
        "px-3 py-2 text-zinc-800 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
      }
      pageLinkClassName={
        "px-3 py-2 ml-0 leading-tight text-zinc-800 bg-white/90 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-800/90 dark:border-gray-700 dark:text-zinc-200 dark:hover:bg-gray-700 dark:hover:text-white"
      }
      previousLinkClassName={
        "px-3 py-2 ml-0 leading-tight text-zinc-800 bg-white/90 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-800/90 dark:border-gray-700 dark:text-zinc-200 dark:hover:bg-gray-700 dark:hover:text-white"
      }
      nextLinkClassName={
        "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-800/90 dark:border-gray-700 dark:text-zinc-200 dark:hover:bg-gray-700 dark:hover:text-white"
      }
      disabledLinkClassName={
        "cursor-not-allowed opacity-50 pointer-events-none"
      }
      activeClassName={
        "text-zinc-800 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
      }
      pageClassName={
        "text-zinc-800 bg-white/90 hover:bg-gray-100 hover:text-gray-700 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-gray-700 dark:hover:text-white"
      }
      initialPage={page - 1}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(data) => {
        const selected = data.selected;
        const page = selected + 1;
        const url = `${pathname}?page=${page}`;
        router.push(url);
      }}
      forcePage={page - 1}
      disableInitialCallback={true}
    />
  );
}
