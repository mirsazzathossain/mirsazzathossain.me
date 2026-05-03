import React from "react";
import {
  DiscordIcon,
  EmailIcon,
  LinkedInIcon,
  PinIcon,
} from "@/components/Icons";
import {
  getOrgLogo,
  getTalkTypeClass,
  getTimelineKindClass,
} from "@/utils/about";

interface About {
  name: string;
  designation: string;
  company: { name: string; url: string };
  description: string;
  location?: string;
  email?: string;
  socialLinks: { name: string; url: string }[];
  resume: string;
}

interface Education {
  school: string;
  schoolURL: string;
  degree: string;
  major: string;
  minor?: string;
  date: string;
  description: string;
}

interface Experience {
  title: string;
  company: string;
  companyURL: string;
  type: string;
  date: string;
  category: "research" | "industry" | "teaching";
  description: string;
}

interface Award {
  title: string;
  time: string;
  icon: string;
  credentialUrl?: string;
  credentialLabel?: string;
}

interface Talk {
  title: string;
  venue: string;
  location: string;
  date: string;
  type: "oral" | "poster" | "workshop";
  slidesUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
}

interface Service {
  venue: string;
  year: number;
  role: string;
}

interface Press {
  title: string;
  outlet: string;
  publisher?: string;
  date: string;
  url: string;
  image?: string;
  desc: string;
}

interface Availability {
  tz: string;
  rangeLabel: string;
  days: string[];
  dates: string[];
  hours: string[];
  grid: string[];
}

interface TimelineYear {
  year: number;
  items: { kind: string; text: string }[];
}

interface Props {
  about: About;
  educations: Education[];
  experiences: Experience[];
  awards: Award[];
  talks: Talk[];
  service: Service[];
  press: Press[];
  availability: Availability;
  timeline: TimelineYear[];
}

function OrgLogo({ name }: { name: string }) {
  const logo = getOrgLogo(name);
  return (
    <div className="w-11 h-11 rounded-[6px] bg-bg-2 border border-rule flex items-center justify-center shrink-0 overflow-hidden">
      {logo.kind === "img" ? (
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-full h-full object-contain p-1"
        />
      ) : (
        <span className="font-serif text-[14px] font-bold text-ink-2">
          {logo.label}
        </span>
      )}
    </div>
  );
}

export default function AboutPage({
  about,
  educations,
  experiences,
  awards,
  talks,
  service,
  press,
  availability,
  timeline,
}: Props) {
  const bioParagraphs = about.description.split("\n\n").filter(Boolean);
  const email = about.email || "mirsazzathossain@gmail.com";
  const location = about.location || "Dhaka, Bangladesh";

  const getSocialUrl = (name: string) =>
    about.socialLinks.find((s) => s.name === name)?.url || "#";

  const sectionTitle = (label: string, first = false) => (
    <h2
      className={`font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 pb-2 border-b border-rule mb-4${first ? "" : " mt-[30px]"}`}
    >
      {label}
    </h2>
  );

  return (
    <div>
      {/* Page header */}
      <header className="mb-8 max-w-[720px]">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-[6px] m-0">
          About
        </p>
        <h1
          className="m-0 font-serif text-[clamp(28px,4.5vw,42px)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
        >
          {about.name}
        </h1>
        <p className="mt-3 text-ink-2 text-[15px] max-w-[60ch] m-0">
          {about.designation} at{" "}
          <a
            href={about.company.url}
            className="text-link hover:text-link-hover underline underline-offset-[3px] decoration-[1px] decoration-link/35 hover:decoration-link-hover"
          >
            {about.company.name}
          </a>
          , Independent University, Bangladesh.
        </p>
      </header>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-[44px]">
        {/* Aside */}
        <aside>
          <img
            className="w-full max-w-[220px] rounded-[10px] object-cover aspect-square"
            src="/images/profile.png"
            alt={about.name}
          />
          <div className="grid gap-[6px] mt-[14px] text-[12.5px] text-ink-2">
            <a
              href="https://www.google.com/maps?q=23.8103,90.4125"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-[6px] hover:text-link transition-colors"
            >
              <PinIcon className="h-[13px] w-[13px]" /> {location}
            </a>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-[6px] hover:text-link transition-colors">
              <EmailIcon className="h-[13px] w-[13px]" /> {email}
            </a>
            <a href="https://www.linkedin.com/in/mirsazzathossain/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-[6px] hover:text-link transition-colors">
              <LinkedInIcon className="w-[13px] h-[13px]" /> mirsazzathossain
            </a>
            <a href="https://discord.gg/M7Jjv9hr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-[6px] hover:text-link transition-colors">
              <DiscordIcon className="w-[13px] h-[13px]" /> mirsazzathossain
            </a>
          </div>
        </aside>

        {/* Main content */}
        <div>
          {/* Bio */}
          {sectionTitle("Bio", true)}
          {bioParagraphs.map((para, i) => (
            <p key={i} className="font-serif text-[16px] leading-[1.65] text-ink max-w-[65ch] mb-[1em] m-0 mb-[1em]">
              {para}
            </p>
          ))}

          {/* Education */}
          {sectionTitle("Education")}
          {educations.map((edu, i) => (
            <div key={i} className="flex gap-[14px] items-start py-3 border-b border-rule-2">
              <OrgLogo name={edu.school} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5"><a href={edu.schoolURL} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{edu.school}</a></h3>
                <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1">
                  {(() => { const [full, abbr] = edu.degree.split(" - "); return abbr ? `${full} · ${abbr} in ${edu.major}` : `${full} in ${edu.major}`; })()}{edu.minor ? ` · Minor in ${edu.minor}` : ""}
                </p>
                <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
                  {edu.description.split(".")[0]}.
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{edu.date}</span>
            </div>
          ))}

          {/* Industry */}
          {sectionTitle("Industry")}
          {experiences.filter((e) => e.category === "industry").map((exp, i) => (
            <div key={i} className="flex gap-[14px] items-start py-3 border-b border-rule-2">
              <OrgLogo name={exp.company} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">{exp.title}</h3>
                <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1"><a href={exp.companyURL} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{exp.company}</a> · Part-time</p>
                <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
                  {exp.description.split(".")[0]}.
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{exp.date}</span>
            </div>
          ))}

          {/* Research */}
          {sectionTitle("Research")}
          {experiences.filter((e) => e.category === "research").map((exp, i) => (
            <div key={i} className="flex gap-[14px] items-start py-3 border-b border-rule-2">
              <OrgLogo name={exp.company} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">{exp.title}</h3>
                <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1"><a href={exp.companyURL} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{exp.company}</a></p>
                <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
                  {exp.description.split(".")[0]}.
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{exp.date}</span>
            </div>
          ))}

          {/* Teaching */}
          {sectionTitle("Teaching")}
          {experiences.filter((e) => e.category === "teaching").map((exp, i) => (
            <div key={i} className="flex gap-[14px] items-start py-3 border-b border-rule-2">
              <OrgLogo name={exp.company} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">{exp.title}</h3>
                <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1"><a href={exp.companyURL} target="_blank" rel="noreferrer" className="hover:text-link transition-colors">{exp.company}</a></p>
                <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
                  {exp.description.split(".")[0]}.
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{exp.date}</span>
            </div>
          ))}

          {/* Honors & Awards */}
          {sectionTitle("Honors & Awards")}
          <ul className="list-none p-0 m-0">
            {awards.map((award, i) => (
              <li
                key={i}
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
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-40 group-hover/award:opacity-100 transition-opacity self-center">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                ) : (
                  <span className="text-ink">{award.title}</span>
                )}
                <span className="font-mono text-[11.5px] text-ink-3 whitespace-nowrap">{award.time}</span>
              </li>
            ))}
          </ul>

          {/* Talks & Presentations */}
          {sectionTitle("Talks & Presentations")}
          <ul className="list-none p-0 m-0 mb-2">
            {talks.map((talk, i) => {
              const url = talk.slidesUrl || talk.videoUrl || talk.posterUrl;
              return (
                <li
                  key={i}
                  className={`relative group -mx-2 grid grid-cols-[64px_1fr_auto] items-start gap-[14px] rounded-[6px] border-b border-dashed border-rule px-2 py-[11px] transition-colors last:border-b-0${url ? " cursor-pointer hover:bg-bg-2" : ""}`}
                >
                  <span
                    className={`font-mono text-[9.5px] tracking-[0.1em] uppercase px-2 py-[3px] rounded-[3px] text-center font-semibold mt-[2px] justify-self-start ${getTalkTypeClass(talk.type)}`}
                  >
                    {talk.type}
                  </span>
                  <div className="min-w-0">
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-baseline gap-[5px] font-serif text-[14.5px] leading-[1.4] text-ink group-hover:text-link transition-colors m-0 mb-0.5 after:absolute after:inset-0 after:content-['']">
                        <span>{talk.title}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity self-center">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    ) : (
                      <p className="font-serif text-[14.5px] leading-[1.4] text-ink m-0 mb-0.5">{talk.title}</p>
                    )}
                    <p className="font-serif text-[12px] text-ink-3 m-0 italic">
                      {talk.venue} · <span className="not-italic">{talk.location}</span>
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap mt-[3px]">{talk.date}</span>
                </li>
              );
            })}
          </ul>

          {/* Service & Reviewing */}
          {sectionTitle("Service & Reviewing")}
          <div className="mb-2 grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
            {service.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-0.5 p-3 px-[14px] border border-rule rounded-lg bg-bg"
              >
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-3 font-semibold">
                  {s.role}
                </span>
                <span className="font-serif text-[15px] text-ink">{s.venue}</span>
                <span className="font-mono text-[11px] text-ink-3">{s.year}</span>
              </div>
            ))}
          </div>

          {/* Press & Mentions */}
          {sectionTitle("Press & Mentions")}
          <ul className="list-none p-0 m-0">
            {press.map((p, i) => (
              <li key={i} className="relative group py-[14px] border-b border-dashed border-rule last:border-b-0 -mx-2 px-2 rounded-[6px] hover:bg-bg-2 transition-colors cursor-pointer">
                <div
                  className={`grid grid-rows-[auto_auto] ${p.image ? "grid-cols-[84px_1fr]" : "grid-cols-1"}`}
                >
                  {/* Row 1: spacer | logos + date */}
                  {p.image && <div />}
                  <div className="flex justify-between gap-3 items-center mb-[6px]">
                    <div className="flex items-center gap-[6px]">
                      {p.outlet === "Bigganchinta" ? (
                        <>
                          <img src="/images/logos/bigganchinta.svg" alt="Bigganchinta" className="h-[11px] w-auto dark:brightness-[4] dark:grayscale" />
                          {p.publisher === "Prothom Alo" && (
                            <>
                              <span className="text-ink-4 text-[10px]">by</span>
                              <img src="/images/logos/prothom-alo.svg" alt="Prothom Alo" className="h-[14px] w-auto dark:brightness-[10] dark:grayscale" />
                            </>
                          )}
                        </>
                      ) : (
                        <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-link font-semibold">
                          {p.outlet}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap">{p.date}</span>
                  </div>
                  {/* Row 2: image | title + desc */}
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-[72px] h-[56px] object-cover rounded-[6px] border border-rule self-start"
                    />
                  )}
                  <div className="min-w-0">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-[15px] leading-[1.35] text-ink group-hover:text-link transition-colors m-0 mb-1 block after:absolute after:inset-0 after:content-['']"
                    >
                      {p.title}
                    </a>
                    <p className="font-serif text-[12.5px] text-ink-2 leading-[1.55] m-0 max-w-[65ch]">{p.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Reach Out */}
          {sectionTitle("Reach Out")}
          <p className="font-serif text-[16px] leading-[1.62] text-ink max-w-[65ch] mb-4 m-0 mb-4">
            Best ways to get in touch are{" "}
            <a
              href={`mailto:${email}`}
              className="text-link hover:text-link-hover underline underline-offset-[3px] decoration-[1px] decoration-link/35"
            >
              email
            </a>{" "}
            for anything substantive, or DMs on the socials below for casual
            things. Currently available for short calls in the windows shaded
            green — most weeks look roughly like this:
          </p>

          {/* Availability grid */}
          <div className="border border-rule rounded-[10px] p-[18px] bg-bg my-1">
            <div className="flex justify-between items-start gap-4 flex-wrap mb-[14px]">
              <div>
                <p className="font-serif text-[15px] text-ink m-0 mb-[3px]">
                  Typical week — {availability.rangeLabel}
                </p>
                <p className="font-serif text-[12px] text-ink-3 m-0">
                  All times shown in{" "}
                  <strong className="text-ink-2 font-semibold">{availability.tz}</strong>.
                  Booked slots in pink, free in green.
                </p>
              </div>
              <div className="flex gap-3 font-mono text-[11px] text-ink-3">
                <span className="inline-flex items-center gap-[5px]">
                  <span className="inline-block h-3 w-3 rounded-[3px] border border-emerald-300 bg-emerald-500/30 dark:border-emerald-500/50" />
                  free
                </span>
                <span className="inline-flex items-center gap-[5px]">
                  <span className="inline-block h-3 w-3 rounded-[3px] border border-rose-300 bg-rose-500/20 dark:border-rose-500/40" />
                  busy
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[56px_repeat(7,1fr)] items-stretch gap-[3px]">
              <div />
              {availability.dates.map((d, i) => (
                <div key={i} className="flex flex-col py-[6px] pb-2 text-center border-b border-rule">
                  <span className="font-mono text-[10px] text-ink-3 tracking-[0.06em] uppercase">
                    {availability.days[i]}
                  </span>
                  <span className="text-[12px] text-ink font-medium mt-0.5">{d}</span>
                </div>
              ))}
              {availability.hours.map((h, ri) => (
                <React.Fragment key={ri}>
                  <div className="font-mono text-[10.5px] text-ink-3 pt-1 pr-2 text-right leading-[1.6]">
                    {h}
                  </div>
                  {(availability.grid[ri] || "").split("").map((c, ci) => (
                    <div
                      key={ci}
                      className={
                        c === "f"
                          ? "min-h-[22px] rounded-[3px] border border-emerald-300 bg-emerald-500/20 dark:border-emerald-500/40"
                          : "min-h-[22px] rounded-[3px] border border-rose-300 bg-rose-500/15 dark:border-rose-500/40"
                      }
                      title={`${availability.days[ci]} ${h}`}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[12.5px] text-ink-3 mt-[14px] m-0 font-serif italic">
              Shoot me an{" "}
              <a
                href={`mailto:${email}`}
                className="text-link hover:text-link-hover not-italic"
              >
                email
              </a>{" "}
              with a 2–3 slot suggestion and I'll confirm one.
            </p>
          </div>

          {/* Timeline */}
          {sectionTitle("Timeline")}
          <div>
            {timeline.map((yr) => (
              <div
                key={yr.year}
                className="grid grid-cols-[60px_1fr] items-baseline gap-[14px] border-b border-dashed border-rule py-[10px] last:border-b-0"
              >
                <div className="font-mono text-[13px] text-ink font-semibold">{yr.year}</div>
                <div className="grid gap-[5px]">
                  {yr.items.map((item, j) => (
                    <div
                      key={j}
                      className="grid grid-cols-[60px_1fr] gap-2.5 text-[13px] text-ink-2"
                    >
                      <span
                        className={`font-mono text-[9.5px] tracking-[0.1em] uppercase px-[6px] py-[2px] rounded-[3px] h-fit ${getTimelineKindClass(item.kind)}`}
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
        </div>
      </div>
    </div>
  );
}
