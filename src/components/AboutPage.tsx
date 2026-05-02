import React from "react";
import {
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  TwitterXIcon,
} from "@/components/SocialIcons";

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
  slidesUrl: string;
}

interface Service {
  venue: string;
  year: number;
  role: string;
}

interface Press {
  title: string;
  outlet: string;
  date: string;
  url: string;
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

type LogoInfo =
  | { kind: "img"; src: string; alt: string }
  | { kind: "text"; label: string };

function getLogo(name: string): LogoInfo {
  if (name.includes("CCDS") || name.includes("Center for Computational"))
    return { kind: "img", src: "/images/logos/ccds.png", alt: "CCDS" };
  if (name.includes("IUB") || name.includes("Independent University"))
    return { kind: "img", src: "/images/logos/iub.png", alt: "IUB" };
  if (name.includes("Postex") || name.includes("Penta"))
    return { kind: "img", src: "/images/logos/penta-global.png", alt: "Penta Global" };
  const words = name.trim().split(/\s+/);
  const label =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 3).toUpperCase();
  return { kind: "text", label };
}

function OrgLogo({ name }: { name: string }) {
  const logo = getLogo(name);
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

function talkTypeClass(type: string): string {
  if (type === "oral") return "bg-accent-soft text-link";
  if (type === "poster") return "bg-[#fef3c7] text-[#92400e] dark:bg-[#422006] dark:text-[#fcd34d]";
  if (type === "workshop") return "bg-[#fdf2f8] text-[#9d174d] dark:bg-[#500724] dark:text-[#f9a8d4]";
  return "bg-bg-2 text-ink-3";
}

function kindClass(kind: string): string {
  if (kind === "paper") return "bg-accent-soft text-link";
  if (kind === "award") return "bg-[#fef3c7] text-[#92400e] dark:bg-[#422006] dark:text-[#fcd34d]";
  if (kind === "career") return "bg-[#ecfdf5] text-[#065f46] dark:bg-[#022c22] dark:text-[#6ee7b7]";
  return "bg-[#f1f5f9] text-ink-2 dark:bg-bg-3";
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
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
          className="leading-[1.05] tracking-[-0.02em] m-0 font-serif text-ink font-semibold"
          style={{ fontSize: "clamp(28px, 4.5vw, 42px)" }}
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
            <span className="inline-flex items-center gap-[6px]">
              <PinIcon /> {location}
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <EmailIcon />
              <a href={`mailto:${email}`} className="text-link hover:text-link-hover">
                {email}
              </a>
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <GoogleScholarIcon className="w-[13px] h-[13px] fill-current" />
              <a href={getSocialUrl("google-scholar")} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">
                Google Scholar
              </a>
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <GitHubIcon className="w-[13px] h-[13px] fill-current" />
              <a href={getSocialUrl("github")} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">
                mirsazzathossain
              </a>
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <LinkedInIcon className="w-[13px] h-[13px] fill-current" />
              <a href={getSocialUrl("linkedin")} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">
                mirsazzathossain
              </a>
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <TwitterXIcon className="w-[13px] h-[13px] fill-current" />
              <a href={getSocialUrl("twitter")} target="_blank" rel="noreferrer" className="text-link hover:text-link-hover">
                @mir_sazzat
              </a>
            </span>
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
                <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">{edu.school}</h3>
                <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1">
                  {edu.degree} in {edu.major}
                  {edu.minor ? ` — Minor in ${edu.minor}` : ""}
                </p>
                <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
                  {edu.description.split(".")[0]}.
                </p>
              </div>
              <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">{edu.date}</span>
            </div>
          ))}

          {/* Experience */}
          {sectionTitle("Experience")}
          {experiences.map((exp, i) => (
            <div key={i} className="flex gap-[14px] items-start py-3 border-b border-rule-2">
              <OrgLogo name={exp.company} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">{exp.title}</h3>
                <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1">{exp.company}</p>
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
                className="grid items-baseline py-[7px] text-[13px] border-b border-dashed border-rule last:border-b-0"
                style={{ gridTemplateColumns: "22px 1fr auto", gap: "10px" }}
              >
                <span className="text-[13px]">{award.icon}</span>
                <span className="text-ink">{award.title}</span>
                <span className="font-mono text-[11.5px] text-ink-3 whitespace-nowrap">{award.time}</span>
              </li>
            ))}
          </ul>

          {/* Talks & Presentations */}
          {sectionTitle("Talks & Presentations")}
          <ul className="list-none p-0 m-0 mb-2">
            {talks.map((talk, i) => (
              <li
                key={i}
                className="grid py-[11px] border-b border-dashed border-rule last:border-b-0 items-baseline"
                style={{ gridTemplateColumns: "64px 1fr auto", gap: "14px" }}
              >
                <span
                  className={`font-mono text-[9.5px] tracking-[0.1em] uppercase px-2 py-[3px] rounded-[3px] text-center font-semibold self-center justify-self-start ${talkTypeClass(talk.type)}`}
                >
                  {talk.type}
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-[14.5px] leading-[1.4] text-ink m-0 mb-0.5">
                    {talk.title}
                  </p>
                  <p className="font-serif text-[12px] text-ink-3 m-0 italic">
                    {talk.venue} ·{" "}
                    <span className="not-italic">{talk.location}</span>
                  </p>
                </div>
                <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap">{talk.date}</span>
              </li>
            ))}
          </ul>

          {/* Service & Reviewing */}
          {sectionTitle("Service & Reviewing")}
          <div
            className="grid gap-2 mb-2"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
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
              <li key={i} className="py-[14px] border-b border-dashed border-rule last:border-b-0">
                <div className="flex justify-between gap-3 items-baseline mb-1">
                  <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-link font-semibold">
                    {p.outlet}
                  </span>
                  <span className="font-mono text-[11px] text-ink-3">{p.date}</span>
                </div>
                <p className="font-serif text-[16px] leading-[1.35] text-ink m-0 mb-1">
                  {p.title}
                </p>
                <p className="font-serif text-[13px] text-ink-2 leading-[1.55] m-0 max-w-[65ch]">{p.desc}</p>
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
                  <span className="inline-block w-3 h-3 rounded-[3px] avail-free-sw" />
                  free
                </span>
                <span className="inline-flex items-center gap-[5px]">
                  <span className="inline-block w-3 h-3 rounded-[3px] avail-busy-sw" />
                  busy
                </span>
              </div>
            </div>
            <div
              className="grid gap-[3px] items-stretch"
              style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}
            >
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
                      className={`min-h-[22px] rounded-[3px] ${c === "f" ? "avail-cell-free" : "avail-cell-busy"}`}
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
                className="grid gap-[14px] py-[10px] border-b border-dashed border-rule last:border-b-0 items-baseline"
                style={{ gridTemplateColumns: "60px 1fr" }}
              >
                <div className="font-mono text-[13px] text-ink font-semibold">{yr.year}</div>
                <div className="grid gap-[5px]">
                  {yr.items.map((item, j) => (
                    <div
                      key={j}
                      className="text-[13px] text-ink-2 grid gap-[10px]"
                      style={{ gridTemplateColumns: "60px 1fr" }}
                    >
                      <span
                        className={`font-mono text-[9.5px] tracking-[0.1em] uppercase px-[6px] py-[2px] rounded-[3px] h-fit ${kindClass(item.kind)}`}
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
