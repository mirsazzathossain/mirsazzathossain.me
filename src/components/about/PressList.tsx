import type { Press } from "./types";

export function PressList({ press }: { press: Press[] }) {
  return (
    <ul className="list-none p-0 m-0">
      {press.map((item) => (
        <li
          key={`${item.title}-${item.date}`}
          className="relative group py-[14px] border-b border-dashed border-rule last:border-b-0 -mx-2 px-2 rounded-[6px] hover:bg-bg-2 transition-colors cursor-pointer"
        >
          <div
            className={`grid grid-rows-[auto_auto] ${
              item.image ? "grid-cols-[84px_1fr]" : "grid-cols-1"
            }`}
          >
            {item.image && <div />}
            <div className="flex justify-between gap-3 items-center mb-[6px]">
              <div className="flex items-center gap-[6px]">
                {/* Outlet: logo if available, else name */}
                {item.outlet.logo ? (
                  <img
                    src={item.outlet.logo}
                    alt={item.outlet.name}
                    className="h-[11px] w-auto dark:brightness-[4] dark:grayscale"
                  />
                ) : (
                  <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-link font-semibold">
                    {item.outlet.name}
                  </span>
                )}

                {/* Publisher: only show if exists */}
                {item.publisher && (
                  <>
                    <span className="text-ink-4 text-[10px]">by</span>
                    {item.publisher.logo ? (
                      <img
                        src={item.publisher.logo}
                        alt={item.publisher.name}
                        className="h-[14px] w-auto dark:brightness-[10] dark:grayscale"
                      />
                    ) : (
                      <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-link font-semibold">
                        {item.publisher.name}
                      </span>
                    )}
                  </>
                )}
              </div>
              <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap">
                {item.date}
              </span>
            </div>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-[72px] h-[56px] object-cover rounded-[6px] border border-rule self-start"
              />
            )}
            <div className="min-w-0">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-[15px] leading-[1.35] text-ink group-hover:text-link transition-colors m-0 mb-1 block after:absolute after:inset-0 after:content-['']"
              >
                {item.title}
              </a>
              <p className="font-serif text-[12.5px] text-ink-2 leading-[1.55] m-0 max-w-[65ch]">
                {item.desc}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
