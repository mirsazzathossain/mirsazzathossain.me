import { DownloadIcon } from "@/components/Icons";
import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Link = { label: string; href: string };

type CVData = {
  header: {
    name: string;
    email: string;
    homepage: string;
    homepageUrl: string;
    scholar: string;
    scholarUrl: string;
    github: string;
    githubUrl: string;
  };
  education: {
    school: string;
    schoolUrl?: string;
    date: string;
    degree: string;
    location?: string;
    details?: string[];
  }[];
  work?: Experience[];
  research: Experience[];
  publications: Publication[];
  underReview: Publication[];
  teaching: Experience[];
  projects: {
    title: string;
    date: string;
    bullets: string[];
    links?: Link[];
  }[];
  awards: { text: string; links?: Link[] }[];
  coursework: string;
  tests: { name: string; result: string }[];
  skills: { category: string; items: string }[];
  references: {
    name: string;
    title: string;
    dept: string;
    org: string;
    email: string;
    website: string;
    websiteUrl: string;
  }[];
};

type Experience = {
  title: string;
  org: string;
  date: string;
  location?: string;
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
    <div className="mx-auto max-w-[780px]">
      <div className="border-rule bg-bg rounded-[12px] border px-[clamp(24px,5vw,52px)] py-[clamp(28px,5vw,48px)] shadow-xs">
        {/* Header */}
        <header className="mb-6">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-ink m-0 font-serif text-[clamp(28px,4.5vw,42px)] leading-[1.05] font-semibold tracking-[-0.02em]">
              {header.name}
            </h1>
            <a
              href="/files/mirsazzathossain-cv.pdf"
              download="mirsazzathossain-cv.pdf"
              className="border-rule bg-bg text-ink hover:border-link/40 hover:bg-accent-soft hover:text-link mt-1 inline-flex shrink-0 items-center gap-2 self-start rounded-[7px] border px-4 py-[7px] font-mono text-[13px] transition-colors hover:no-underline"
            >
              <DownloadIcon className="h-[14px] w-[14px]" />
              Download PDF
            </a>
          </div>
          <div className="text-ink-3 grid grid-cols-1 gap-x-10 gap-y-0.5 font-mono text-[12px] sm:grid-cols-2">
            <span>
              <span className="text-ink-2">Email: </span>
              <a href={`mailto:${header.email}`} className="hover:text-link transition-colors">
                {header.email}
              </a>
            </span>
            <span>
              <span className="text-ink-2">Google Scholar: </span>
              <a
                href={header.scholarUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-link transition-colors"
              >
                {header.scholar}
              </a>
            </span>
            <span>
              <span className="text-ink-2">Homepage: </span>
              <a
                href={header.homepageUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-link transition-colors"
              >
                {header.homepage}
              </a>
            </span>
            <span>
              <span className="text-ink-2">Github: </span>
              <a
                href={header.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-link transition-colors"
              >
                {header.github}
              </a>
            </span>
          </div>
        </header>

        {/* Education */}
        <S title="Education">
          {cv.education.map((ed) => (
            <Entry
              key={ed.school}
              title={ed.school}
              titleHref={ed.schoolUrl}
              date={ed.date}
              sub={ed.degree}
              loc={ed.location}
            >
              {ed.details?.map((d, i) => (
                <p key={i} className="text-ink-2 m-0 text-[13px] leading-[1.6]">
                  {ri(d)}
                </p>
              ))}
            </Entry>
          ))}
        </S>

        {/* Work Experience */}
        {cv.work && cv.work.length > 0 && (
          <S title="Work Experience">
            {cv.work.map((w) => (
              <Entry key={w.title} title={w.title} date={w.date} sub={w.org} loc={w.location}>
                <Bullets items={w.bullets} />
              </Entry>
            ))}
          </S>
        )}

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
          {cv.publications.map((p, i) => (
            <Pub key={i} pub={p} me={header.name} />
          ))}
        </S>

        {/* Under-review */}
        <S title="Under-review Papers">
          {cv.underReview.map((p, i) => (
            <Pub key={i} pub={p} me={header.name} />
          ))}
        </S>

        {/* Teaching */}
        <S title="Teaching Experience">
          {cv.teaching.map((t) => (
            <Entry
              key={t.title + t.date}
              title={t.title}
              date={t.date}
              sub={t.org}
              loc={t.location}
            >
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
                <div className="mt-1.5 flex gap-2">
                  {p.links.map((l) => (
                    <L key={l.label} href={l.href}>
                      {l.label}
                    </L>
                  ))}
                </div>
              )}
            </Entry>
          ))}
        </S>

        {/* Awards */}
        <S title="Awards, Honors &amp; Achievements">
          <ul className="m-0 list-none space-y-[5px] p-0">
            {cv.awards.map((a, i) => (
              <li key={i} className="text-ink-2 flex gap-[10px] text-[13px] leading-[1.65]">
                <span className="text-ink-3 shrink-0 select-none">•</span>
                <span>
                  {ri(a.text)}
                  {a.links?.map((l) => (
                    <React.Fragment key={l.label}>
                      {" "}
                      <L href={l.href}>{l.label}</L>
                    </React.Fragment>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </S>

        {/* Coursework */}
        <S title="Relevant Coursework">
          <p className="text-ink-2 m-0 text-[13px] leading-[1.65]">{cv.coursework}</p>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cv.references.map((r) => (
              <div
                key={r.name}
                className="border-rule bg-bg-2 text-ink-2 rounded-lg border p-4 text-[13px] leading-[1.7]"
              >
                <p className="text-ink m-0 font-serif text-[15px] font-semibold">{r.name}</p>
                <p className="text-ink-3 m-0 text-[12.5px] italic">{r.title}</p>
                <p className="m-0">{r.dept}</p>
                <p className="m-0">{r.org}</p>
                <p className="m-0">
                  Email:{" "}
                  <a href={`mailto:${r.email}`} className="text-link hover:text-link-hover">
                    {r.email}
                  </a>
                </p>
                <p className="m-0">
                  Website:{" "}
                  <a
                    href={r.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link hover:text-link-hover"
                  >
                    {r.website}
                  </a>
                </p>
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
        className="text-ink-3 border-rule mb-4 border-b pb-2 font-mono text-[11px] tracking-[0.16em] uppercase"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {children}
    </section>
  );
}

function Entry({
  title,
  titleHref,
  date,
  sub,
  loc,
  children,
}: {
  title: string;
  titleHref?: string;
  date: string;
  sub?: string;
  loc?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        {titleHref ? (
          <a
            href={titleHref}
            target="_blank"
            rel="noreferrer"
            className="text-ink hover:text-link font-serif text-[15.5px] font-semibold transition-colors"
          >
            {title}
          </a>
        ) : (
          <span className="text-ink font-serif text-[15.5px] font-semibold">{title}</span>
        )}
        <span className="text-ink-3 shrink-0 font-mono text-[11px] whitespace-nowrap">{date}</span>
      </div>
      {(sub || loc) && (
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          {sub && <p className="text-ink-3 m-0 text-[12.5px] italic">{sub}</p>}
          {loc && (
            <span className="text-ink-3 shrink-0 font-mono text-[11px] whitespace-nowrap">
              {loc}
            </span>
          )}
        </div>
      )}
      {children && <div className="mt-1.5">{children}</div>}
    </div>
  );
}

function Pub({ pub, me }: { pub: Publication; me: string }) {
  return (
    <div className="mb-3 flex gap-3 last:mb-0">
      <span className="text-ink-3 w-5 shrink-0 pt-[3px] font-mono text-[11px]">({pub.type})</span>
      <p className="text-ink-2 m-0 text-[13px] leading-[1.65]">
        {pub.authors.map((a, i) => (
          <React.Fragment key={i}>
            {a === me ? <strong className="text-ink font-semibold">{a}</strong> : a}
            {i < pub.authors.length - 1 ? ", " : ". "}
          </React.Fragment>
        ))}
        &ldquo;<strong className="text-ink font-semibold">{pub.title}</strong>&rdquo;{" "}
        {ri(pub.venue)}
        {pub.rank && (
          <>
            {" "}
            <span className="text-ink-2 font-mono text-[11px] font-semibold">[{pub.rank}]</span>
          </>
        )}
        {pub.links?.map((l) => (
          <React.Fragment key={l.label}>
            {" "}
            <L href={l.href}>{l.label}</L>
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="m-0 list-none space-y-[5px] p-0">
      {items.map((item, i) => (
        <li key={i} className="text-ink-2 flex gap-[10px] text-[13px] leading-[1.65]">
          <span className="text-ink-3 shrink-0 select-none">•</span>
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
      className="text-link border-link/30 hover:bg-accent-soft rounded-[3px] border px-[5px] py-[1px] font-mono text-[10.5px] whitespace-nowrap hover:no-underline"
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
      return (
        <strong key={i} className="text-ink font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
