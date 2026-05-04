import { getTimelineKindClass } from "@/utils/about";
import type { TimelineYear } from "./types";

export function TimelineList({ timeline }: { timeline: TimelineYear[] }) {
  return (
    <div>
      {timeline.map((year) => (
        <div
          key={year.year}
          className="grid grid-cols-[60px_1fr] items-baseline gap-[14px] border-b border-dashed border-rule py-[10px] last:border-b-0"
        >
          <div className="font-mono text-[13px] text-ink font-semibold">
            {year.year}
          </div>
          <div className="grid gap-[5px]">
            {year.items.map((item, index) => (
              <div
                key={`${item.kind}-${index}`}
                className="grid grid-cols-[60px_1fr] gap-2.5 text-[13px] text-ink-2"
              >
                <span
                  className={`font-mono text-[9.5px] tracking-[0.1em] uppercase px-[6px] py-[2px] rounded-[3px] h-fit ${getTimelineKindClass(
                    item.kind
                  )}`}
                >
                  {item.kind}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
