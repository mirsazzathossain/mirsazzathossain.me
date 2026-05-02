import React from 'react';

export function HeroBio({ about }: { about: any }) {
  // Take just the first paragraph of the bio for the hero section
  const shortBio = about.description.split('\n\n')[0];

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between pb-2 border-b border-rule mb-4 gap-3 flex-wrap">
        <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 font-semibold m-0">
          Short Intro
        </h2>
        <a className="font-mono text-[11.5px] text-link inline-flex items-center gap-1 whitespace-nowrap hover:underline hover:decoration-link/35 hover:underline-offset-[3px]" href="/about">
          Full bio <span className="text-current transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
      <p className="font-serif text-[17px] leading-[1.55] text-ink m-0 max-w-[60ch] text-pretty">
        {shortBio}
      </p>
    </div>
  );
}

function getTagFromTitle(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("paper")) return { label: "paper", className: "bg-accent-soft text-link" };
  if (lower.includes("grant") || lower.includes("award")) return { label: "award", className: "bg-[#fef3c7] text-[#92400e] dark:bg-[#422006] dark:text-[#fcd34d]" };
  if (lower.includes("working") || lower.includes("role")) return { label: "career", className: "bg-[#ecfdf5] text-[#065f46] dark:bg-[#022c22] dark:text-[#6ee7b7]" };
  if (lower.includes("talk") || lower.includes("presentation")) return { label: "talk", className: "bg-[#fdf2f8] text-[#9d174d] dark:bg-[#500724] dark:text-[#f9a8d4]" };
  return { label: "milestone", className: "bg-bg-3 text-ink-2" };
}

export function RecentNews({ lifeEvents }: { lifeEvents: Record<string, any[]> }) {
  // Flatten events and sort by year descending (assuming keys are years)
  const years = Object.keys(lifeEvents).sort((a, b) => parseInt(b) - parseInt(a));
  const flattenedEvents: Array<{ year: string; title: string; description: string }> = [];
  
  years.forEach(year => {
    lifeEvents[year].forEach(event => {
      flattenedEvents.push({ year, ...event });
    });
  });

  const topEvents = flattenedEvents.slice(0, 5);

  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between pb-2 border-b border-rule mb-4 gap-3 flex-wrap">
        <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 font-semibold m-0">
          Recent News
        </h2>
        <a className="font-mono text-[11.5px] text-link inline-flex items-center gap-1 whitespace-nowrap hover:underline hover:decoration-link/35 hover:underline-offset-[3px]" href="/about">
          Full timeline <span className="text-current transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
      <ul className="list-none p-0 m-0">
        {topEvents.map((n, i) => {
          const tagInfo = getTagFromTitle(n.title);
          return (
            <li key={i} className="grid grid-cols-[50px_60px_1fr] md:grid-cols-[78px_60px_1fr] gap-3 items-baseline py-2 border-b border-dashed border-rule text-[13.5px] last:border-0">
              <span className="text-ink-3 font-mono text-[11px] tracking-[0.02em]">{n.year}</span>
              <span className={`text-[9.5px] font-mono tracking-[0.08em] uppercase py-[2px] px-[6px] rounded-[3px] text-center font-semibold justify-self-start ${tagInfo.className}`}>
                {tagInfo.label}
              </span>
              <span className="text-ink-2">
                {n.title.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
