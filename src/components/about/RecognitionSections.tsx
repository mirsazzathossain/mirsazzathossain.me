import { ExternalLinkIcon } from "@/components/Icons";
import { getTalkTypeClass } from "@/utils/about";
import type { Award, Service, Talk } from "./types";

export function AwardsList({ awards }: { awards: Award[] }) {
  return (
    <ul className="list-none p-0 m-0">
      {awards.map((award) => (
        <li
          key={`${award.title}-${award.time}`}
          className="grid grid-cols-[22px_1fr_auto] items-baseline gap-2.5 border-b border-dashed border-rule py-[7px] text-[13px] last:border-b-0"
        >
          <span className="text-[13px]">{award.icon}</span>
          {award.credentialUrl ? (
            <a
              href={award.credentialUrl}
              target="_blank"
              rel="noreferrer"
              title={award.credentialLabel || "View credential"}
              className="inline-flex items-baseline gap-[5px] text-ink hover:text-link transition-colors group/award"
            >
              <span>{award.title}</span>
              <ExternalLinkIcon className="w-2.5 h-2.5 shrink-0 opacity-40 group-hover/award:opacity-100 transition-opacity self-center" />
            </a>
          ) : (
            <span className="text-ink">{award.title}</span>
          )}
          <span className="font-mono text-[11.5px] text-ink-3 whitespace-nowrap">
            {award.time}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TalksList({ talks }: { talks: Talk[] }) {
  return (
    <ul className="list-none p-0 m-0 mb-2">
      {talks.map((talk) => {
        const url = talk.slidesUrl || talk.videoUrl || talk.posterUrl;

        return (
          <li
            key={`${talk.title}-${talk.date}`}
            className={`relative group -mx-2 grid grid-cols-[64px_1fr_auto] items-start gap-[14px] rounded-[6px] border-b border-dashed border-rule px-2 py-[11px] transition-colors last:border-b-0${
              url ? " cursor-pointer hover:bg-bg-2" : ""
            }`}
          >
            <span
              className={`font-mono text-[9.5px] tracking-[0.1em] uppercase px-2 py-[3px] rounded-[3px] text-center font-semibold mt-[2px] justify-self-start ${getTalkTypeClass(
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
                  className="inline-flex items-baseline gap-[6px] font-serif text-[14.5px] leading-[1.4] text-ink group-hover:text-link transition-colors m-0 mb-0.5"
                >
                  <span className="inline">
                    {talk.title}{" "}
                    <ExternalLinkIcon className="w-3 h-3 inline-block shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              ) : (
                <p className="font-serif text-[14.5px] leading-[1.4] text-ink m-0 mb-0.5">
                  {talk.title}
                </p>
              )}
              <p className="font-serif text-[12px] text-ink-3 m-0 italic">
                {talk.venue} ·{" "}
                <span className="not-italic">{talk.location}</span>
              </p>
            </div>
            <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap mt-[3px]">
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
    <div className="mb-2 grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
      {service.map((item) => (
        <div
          key={`${item.venue}-${item.year}-${item.role}`}
          className="flex flex-col gap-0.5 p-3 px-[14px] border border-rule rounded-lg bg-bg"
        >
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-3 font-semibold">
            {item.role}
          </span>
          <span className="font-serif text-[15px] text-ink">{item.venue}</span>
          <span className="font-mono text-[11px] text-ink-3">{item.year}</span>
        </div>
      ))}
    </div>
  );
}
