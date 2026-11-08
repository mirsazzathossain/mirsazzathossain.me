import { ExternalLinkIcon } from "@/components/Icons";
import { getTalkTypeClass } from "@/utils/about";
import type { Award, Service, Talk } from "./types";

export function AwardsList({ awards }: { awards: Award[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {awards.map((award) => (
        <li
          key={`${award.title}-${award.time}`}
          className="border-rule grid grid-cols-[22px_1fr_auto] items-baseline gap-2.5 border-b border-dashed py-[7px] text-[13px] last:border-b-0"
        >
          <span className="text-[13px]">{award.icon}</span>
          {award.credentialUrl ? (
            <a
              href={award.credentialUrl}
              target="_blank"
              rel="noreferrer"
              title={award.credentialLabel || "View credential"}
              className="text-ink hover:text-link group/award inline-flex items-baseline gap-[5px] transition-colors"
            >
              <span>{award.title}</span>
              <ExternalLinkIcon className="h-2.5 w-2.5 shrink-0 self-center opacity-40 transition-opacity group-hover/award:opacity-100" />
            </a>
          ) : (
            <span className="text-ink">{award.title}</span>
          )}
          <span className="text-ink-3 font-mono text-[11.5px] whitespace-nowrap">{award.time}</span>
        </li>
      ))}
    </ul>
  );
}

export function TalksList({ talks }: { talks: Talk[] }) {
  return (
    <ul className="m-0 mb-2 list-none p-0">
      {[...talks]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((talk) => {
          const url = talk.slidesUrl || talk.videoUrl || talk.posterUrl;

          return (
            <li
              key={`${talk.title}-${talk.date}`}
              className={`group border-rule relative -mx-2 grid grid-cols-[64px_1fr_auto] items-start gap-[14px] rounded-[6px] border-b border-dashed px-2 py-[11px] transition-colors last:border-b-0${
                url ? "hover:bg-bg-2 cursor-pointer" : ""
              }`}
            >
              <span
                className={`mt-[2px] justify-self-start rounded-[3px] px-2 py-[3px] text-center font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase ${getTalkTypeClass(
                  talk.type,
                )}`}
              >
                {talk.type}
              </span>
              <div className="min-w-0">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink group-hover:text-link m-0 mb-0.5 inline-flex items-baseline gap-[6px] font-serif text-[14.5px] leading-[1.4] transition-colors"
                  >
                    <span className="inline">
                      {talk.title}{" "}
                      <ExternalLinkIcon className="inline-block h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
                    </span>
                  </a>
                ) : (
                  <p className="text-ink m-0 mb-0.5 font-serif text-[14.5px] leading-[1.4]">
                    {talk.title}
                  </p>
                )}
                <p className="text-ink-3 m-0 font-serif text-[12px] italic">
                  {talk.venue} · <span className="not-italic">{talk.location}</span>
                </p>
              </div>
              <span className="text-ink-3 mt-[3px] font-mono text-[11px] whitespace-nowrap">
                {talk.date}
              </span>
            </li>
          );
        })}
    </ul>
  );
}

export function ServiceGrid({ service }: { service: Service[] }) {
  return (
    <div className="mb-2 grid [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] gap-2">
      {service.map((item) => (
        <div
          key={`${item.venue}-${item.year}-${item.role}`}
          className="border-rule bg-bg flex flex-col gap-0.5 rounded-lg border p-3 px-[14px]"
        >
          <span className="text-ink-3 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase">
            {item.role}
          </span>
          <span className="text-ink font-serif text-[15px]">{item.venue}</span>
          <span className="text-ink-3 font-mono text-[11px]">{item.year}</span>
        </div>
      ))}
    </div>
  );
}
