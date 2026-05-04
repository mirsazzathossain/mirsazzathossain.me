import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";

export function Pagination({
  page,
  totalPages,
  onPageChange,
  label,
  className = "mt-4",
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number | ((current: number) => number)) => void;
  label: string;
  className?: string;
}) {
  return (
    <nav
      className={`${className} flex items-center justify-between gap-3 border-t border-rule pt-4`}
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onPageChange((current) => Math.max(1, current - 1))}
        disabled={page === 1}
        className="inline-flex items-center gap-1 rounded border border-rule bg-bg px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowLeftIcon />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={
                pageNumber === page
                  ? "h-8 min-w-8 rounded border border-ink bg-ink px-2 font-mono text-[11.5px] text-bg"
                  : "h-8 min-w-8 rounded border border-rule bg-bg px-2 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link"
              }
            >
              {pageNumber}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          onPageChange((current) => Math.min(totalPages, current + 1))
        }
        disabled={page === totalPages}
        className="inline-flex items-center gap-1 rounded border border-rule bg-bg px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link disabled:pointer-events-none disabled:opacity-40"
      >
        <span>Next</span>
        <ArrowRightIcon />
      </button>
    </nav>
  );
}
