import type { Press } from "./types";

export function PressList({ press }: { press: Press[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {press.map((item) => (
        <li
          key={`${item.title}-${item.date}`}
          className="group border-rule hover:bg-bg-2 relative cursor-pointer rounded-[6px] border-b border-dashed px-2 py-[14px] transition-colors last:border-b-0"
        >
          <div
            className={`grid grid-rows-[auto_auto] ${
              item.image ? "grid-cols-[84px_1fr]" : "grid-cols-1"
            }`}
          >
            {item.image && <div />}
            <div className="mb-[6px] flex items-center justify-between gap-3">
              <div className="flex items-center gap-[6px]">
                {/* Outlet: logo if available, else name */}
                {item.outlet.logo ? (
                  <img
                    src={item.outlet.logo}
                    alt={item.outlet.name}
                    className="h-[11px] w-auto dark:brightness-[4] dark:grayscale"
                  />
                ) : (
                  <span className="text-link font-mono text-[10.5px] font-semibold tracking-[0.06em] uppercase">
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
                      <span className="text-link font-mono text-[10.5px] font-semibold tracking-[0.06em] uppercase">
                        {item.publisher.name}
                      </span>
                    )}
                  </>
                )}
              </div>
              <span className="text-ink-3 font-mono text-[11px] whitespace-nowrap">
                {item.date}
              </span>
            </div>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="border-rule h-[56px] w-[72px] self-start rounded-[6px] border object-cover"
              />
            )}
            <div className="min-w-0">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink group-hover:text-link m-0 mb-1 block font-serif text-[15px] leading-[1.35] transition-colors after:absolute after:inset-0 after:content-['']"
              >
                {item.title}
              </a>
              <p className="text-ink-2 m-0 max-w-[65ch] font-serif text-[12.5px] leading-[1.55]">
                {item.desc}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
