import { DownloadIcon } from "@/components/Icons";
import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Link = { label: string; href: string };

type CVData = {
  header: {
    name: string;
    email: string;
    homepage: string; homepageUrl: string;
    scholar: string; scholarUrl: string;
    github: string; githubUrl: string;
  };
  education: {
    school: string; schoolUrl?: string;
    date: string; degree: string; location?: string;
    details?: string[];
  }[];
  research: Experience[];
  publications: Publication[];
  underReview: Publication[];
  teaching: Experience[];
  projects: {
    title: string; date: string;
    bullets: string[]; links?: Link[];
  }[];
  awards: { text: string; links?: Link[] }[];
  coursework: string;
  tests: { name: string; result: string }[];
  skills: { category: string; items: string }[];
  references: {
    name: string; title: string; dept: string; org: string;
    email: string; website: string; websiteUrl: string;
  }[];
};

type Experience = {
  title: string; org: string;
  date: string; location?: string;
  bullets: string[];
};

type Publication = {
  type: "C" | "J" | "W";
  authors: string[];
  title: string;
  venue: string;
  rank?: string;
  links?: Link[];
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function CVPage({ cv }: { cv: CVData }) {
  const { header } = cv;

  return (
    <div className="max-w-[780px] mx-auto">
      <div className="border border-rule rounded-[12px] bg-bg shadow-sm px-[clamp(24px,5vw,52px)] py-[clamp(28px,5vw,48px)]">

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <h1 className="font-serif text-[clamp(28px,4.5vw,42px)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink m-0">
              {header.name}
            </h1>
            <a
              href="/files/mirsazzathossain-cv.pdf"
              download="mirsazzathossain-cv.pdf"
              className="inline-flex items-center gap-2 px-4 py-[7px] rounded-[7px] border border-rule bg-bg text-ink text-[13px] font-mono transition-colors hover:border-link/40 hover:bg-accent-soft hover:text-link hover:no-underline shrink-0 self-start mt-1"
            >
              <DownloadIcon className="w-[14px] h-[14px]" />
              Download PDF
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0.5 font-mono text-[12px] text-ink-3">
            <span><span className="text-ink-2">Email: </span><a href={`mailto:${header.email}`} className="hover:text-link transition-colors">{header.email}</a></span>
            <span><span className="text-ink-2">Google Scholar: </span><a href={header.scholarUrl} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{header.scholar}</a></span>
            <span><span className="text-ink-2">Homepage: </span><a href={header.homepageUrl} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{header.homepage}</a></span>
            <span><span className="text-ink-2">Github: </span><a href={header.githubUrl} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{header.github}</a></span>
          </div>
        </header>

        {/* Education */}
        <S title="Education">
          {cv.education.map((ed) => (
            <Entry key={ed.school} title={ed.school} titleHref={ed.schoolUrl} date={ed.date} sub={ed.degree} loc={ed.location}>
              {ed.details?.map((d, i) => (
                <p key={i} className="text-[13px] text-ink-2 m-0 leading-[1.6]">{ri(d)}</p>
              ))}
            </Entry>
          ))}
        </S>

        {/* Research Experience */}
        <S title="Research Experience">
          {cv.research.map((r) => (
            <Entry key={r.title} title={r.title} date={r.date} sub={r.org} loc={r.location}>
              <Bullets items={r.bullets} />
            </Entry>
          ))}
        </S>

        {/* Publications */}
        <S title="Publications">
          {cv.publications.map((p, i) => <Pub key={i} pub={p} me={header.name} />)}
        </S>

        {/* Under-review */}
        <S title="Under-review Papers">
          {cv.underReview.map((p, i) => <Pub key={i} pub={p} me={header.name} />)}
        </S>

        {/* Teaching */}
        <S title="Teaching Experience">
          {cv.teaching.map((t) => (
            <Entry key={t.title + t.date} title={t.title} date={t.date} sub={t.org} loc={t.location}>
              <Bullets items={t.bullets} />
            </Entry>
          ))}
        </S>

        {/* Projects */}
        <S title="Selected Projects">
          {cv.projects.map((p) => (
            <Entry key={p.title} title={p.title} date={p.date}>
              <Bullets items={p.bullets} />
              {p.links && (
                <div className="flex gap-2 mt-1.5">
                  {p.links.map((l) => <L key={l.label} href={l.href}>{l.label}</L>)}
                </div>
              )}
            </Entry>
          ))}
        </S>

        {/* Awards */}
        <S title="Awards, Honors &amp; Achievements">
          <ul className="list-none p-0 m-0 space-y-[5px]">
            {cv.awards.map((a, i) => (
              <li key={i} className="flex gap-[10px] text-[13px] text-ink-2 leading-[1.65]">
                <span className="shrink-0 select-none text-ink-3">•</span>
                <span>
                  {ri(a.text)}
                  {a.links?.map((l) => (
                    <React.Fragment key={l.label}>{" "}<L href={l.href}>{l.label}</L></React.Fragment>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </S>

        {/* Coursework */}
        <S title="Relevant Coursework">
          <p className="text-[13px] text-ink-2 leading-[1.65] m-0">{cv.coursework}</p>
        </S>

        {/* Tests */}
        <S title="Standardized Tests">
          <Bullets items={cv.tests.map((t) => `**${t.name}:** ${t.result}`)} />
        </S>

        {/* Skills */}
        <S title="Technical Skills">
          <Bullets items={cv.skills.map((s) => `**${s.category}:** ${s.items}`)} />
        </S>

        {/* References */}
        <S title="References">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cv.references.map((r) => (
              <div key={r.name} className="border border-rule rounded-lg p-4 bg-bg-2 text-[13px] text-ink-2 leading-[1.7]">
                <p className="m-0 font-serif font-semibold text-ink text-[15px]">{r.name}</p>
                <p className="m-0 text-[12.5px] italic text-ink-3">{r.title}</p>
                <p className="m-0">{r.dept}</p>
                <p className="m-0">{r.org}</p>
                <p className="m-0">Email: <a href={`mailto:${r.email}`} className="text-link hover:text-link-hover">{r.email}</a></p>
                <p className="m-0">Website: <a href={r.websiteUrl} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">{r.website}</a></p>
              </div>
            ))}
          </div>
        </S>

      </div>
    </div>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────────

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-[30px]">
      <h2
        className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 pb-2 border-b border-rule mb-4"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {children}
    </section>
  );
}

function Entry({
  title, titleHref, date, sub, loc, children,
}: {
  title: string; titleHref?: string; date: string;
  sub?: string; loc?: string; children?: React.ReactNode;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-baseline gap-3 flex-wrap">
        {titleHref ? (
          <a href={titleHref} target="_blank" rel="noreferrer" className="font-serif text-[15.5px] font-semibold text-ink hover:text-link transition-colors">
            {title}
          </a>
        ) : (
          <span className="font-serif text-[15.5px] font-semibold text-ink">{title}</span>
        )}
        <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{date}</span>
      </div>
      {(sub || loc) && (
        <div className="flex justify-between items-baseline gap-3 flex-wrap">
          {sub && <p className="text-[12.5px] italic text-ink-3 m-0">{sub}</p>}
          {loc && <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{loc}</span>}
        </div>
      )}
      {children && <div className="mt-1.5">{children}</div>}
    </div>
  );
}

function Pub({ pub, me }: { pub: Publication; me: string }) {
  return (
    <div className="flex gap-3 mb-3 last:mb-0">
      <span className="font-mono text-[11px] text-ink-3 shrink-0 pt-[3px] w-5">({pub.type})</span>
      <p className="m-0 text-[13px] leading-[1.65] text-ink-2">
        {pub.authors.map((a, i) => (
          <React.Fragment key={i}>
            {a === me
              ? <strong className="font-semibold text-ink">{a}</strong>
              : a}
            {i < pub.authors.length - 1 ? ", " : ". "}
          </React.Fragment>
        ))}
        &ldquo;<strong className="font-semibold text-ink">{pub.title}</strong>&rdquo;{" "}
        {ri(pub.venue)}
        {pub.rank && <> <span className="font-mono text-[11px] font-semibold text-ink-2">[{pub.rank}]</span></>}
        {pub.links?.map((l) => (
          <React.Fragment key={l.label}>{" "}<L href={l.href}>{l.label}</L></React.Fragment>
        ))}
      </p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 space-y-[5px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-[10px] text-[13px] text-ink-2 leading-[1.65]">
          <span className="shrink-0 select-none text-ink-3">•</span>
          <span>{ri(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function L({ href, children }: { href: string; children: React.ReactNode }) {
  const internal = href.startsWith("/");
  return (
    <a
      href={href}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noreferrer"}
      className="font-mono text-[10.5px] text-link border border-link/30 rounded-[3px] px-[5px] py-[1px] hover:bg-accent-soft hover:no-underline whitespace-nowrap"
    >
      {children}
    </a>
  );
}

/** Render inline **bold** and *italic* markdown. */
function ri(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
