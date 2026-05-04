import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTagInfoFromKind, stripEmoji } from "@/utils/about";

export function HeroBio({ about }: { about: any }) {
  // Take just the first paragraph of the bio for the hero section
  const shortBio = about.description.split("\n\n")[0];

  return (
    <div className="mb-8">
      <SectionHeader title="Short Intro" href="/about" action="Full bio" />
      <p className="font-serif text-[17px] leading-[1.55] text-ink m-0 max-w-[60ch] text-pretty">
        {shortBio}
      </p>
    </div>
  );
}

export function RecentNews({
  news,
}: {
  news: Array<{ year: number; items: Array<{ kind: string; text: string }> }>;
}) {
  // Flatten timeline items and take top 5
  const flattenedEvents: Array<{
    year: number;
    kind: string;
    text: string;
  }> = [];

  news.forEach((yearGroup) => {
    yearGroup.items.forEach((item) => {
      flattenedEvents.push({ year: yearGroup.year, ...item });
    });
  });

  const topEvents = flattenedEvents.slice(0, 5);

  return (
    <div className="mb-10">
      <SectionHeader title="News" href="/about" action="Full timeline" />
      <ul className="list-none p-0 m-0">
        {topEvents.map((n, i) => {
          const tagInfo = getTagInfoFromKind(n.kind);
          return (
            <li
              key={i}
              className="grid grid-cols-[50px_60px_1fr] md:grid-cols-[78px_60px_1fr] gap-3 items-baseline py-2 border-b border-dashed border-rule text-[13.5px] last:border-0"
            >
              <span className="text-ink-3 font-mono text-[11px] tracking-[0.02em]">
                {n.year}
              </span>
              <span
                className={`text-[9.5px] font-mono tracking-[0.08em] uppercase py-[2px] px-[6px] rounded-[3px] text-center font-semibold justify-self-start ${tagInfo.className}`}
              >
                {tagInfo.label}
              </span>
              <span className="text-ink-2">{stripEmoji(n.text)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
