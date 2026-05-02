import React from 'react';
import {
  ACMIcon,
  DBLPIcon,
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  OrcidIcon,
  ResearchGateIcon,
  SementicScholarIcon,
  TwitterXIcon,
  ACLIcon,
  OpenReviewIcon,
} from "@/components/SocialIcons";

function pickIcon(name: string) {
  if (name === "github") return GitHubIcon;
  if (name === "linkedin") return LinkedInIcon;
  if (name === "twitter") return TwitterXIcon;
  if (name === "google-scholar") return GoogleScholarIcon;
  if (name === "semantic-scholar") return SementicScholarIcon;
  if (name === "dblp") return DBLPIcon;
  if (name === "researchgate") return ResearchGateIcon;
  if (name === "orcid") return OrcidIcon;
  if (name === "acm-dl") return ACMIcon;
  if (name === "acl") return ACLIcon;
  if (name === "openreview") return OpenReviewIcon;
  return null;
}

function formatLabel(name: string) {
  const map: Record<string, string> = {
    "google-scholar": "Google Scholar",
    "semantic-scholar": "Semantic Scholar",
    "dblp": "DBLP",
    "acl": "ACL Anthology",
    "openreview": "OpenReview",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "twitter": "Twitter",
    "researchgate": "ResearchGate",
    "orcid": "ORCID",
    "acm-dl": "ACM Digital Library"
  };
  return map[name] || name;
}

export default function ProfileSidebar({ about }: { about: any }) {
  const researchInterests = [
    "Computer Vision",
    "Domain Adaptation",
    "Astrophysical ML"
  ];

  return (
    <aside className="self-start text-center flex flex-col items-center">
      <img
        className="w-[132px] h-[132px] rounded-full object-cover shadow-[0_6px_20px_rgba(15,23,42,0.10)] block mx-auto mb-[18px]"
        src="/images/user.png"
        alt={about.name}
      />

      <h1 className="font-serif text-[24px] leading-[1.15] m-0 mb-1 tracking-[-0.02em] text-ink font-semibold">
        {about.name}
      </h1>

      <p className="text-[13.5px] text-ink-2 m-0 mb-[6px] leading-[1.4]">
        {about.designation}
      </p>

      <p className="text-[12.5px] text-ink-3 m-0 mb-3 leading-[1.5] flex flex-col items-center">
        <a href={about.company.url} className="text-link hover:text-link-hover underline decoration-link/35 underline-offset-[3px]">
          {about.company.name}
        </a>
        <span className="text-ink-3">Independent University, Bangladesh</span>
      </p>

      <span className="inline-flex items-center gap-[7px] py-1 pl-2 pr-[10px] border border-[#bbf7d0] bg-[#f0fdf4] dark:bg-[rgba(6,95,70,0.16)] dark:border-[rgba(16,185,129,0.3)] dark:text-[#6ee7b7] rounded-full text-[11.5px] text-[#065f46] font-mono mb-[14px]">
        <span className="w-[6px] h-[6px] rounded-full bg-green shadow-[0_0_0_3px_rgba(16,185,129,0.18)]" />
        Applying for Fall 2025 PhD
      </span>

      <ul className="list-none p-0 m-0 mt-3 flex gap-1.5 justify-center flex-wrap">
        {about.socialLinks.map((s: any) => {
          const Icon = pickIcon(s.name);
          if (!Icon) return null;
          const label = formatLabel(s.name);
          return (
            <li key={s.name}>
              <a
                href={s.url}
                aria-label={label}
                title={label}
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-ink-3 hover:text-link hover:bg-bg-2 hover:no-underline transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="w-4 h-4 fill-current" />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-[14px] border-t border-dashed border-rule w-full flex flex-col text-left">
        <span className="block font-mono text-[9.5px] tracking-[0.14em] uppercase text-ink-3 mb-2 font-semibold">
          Research interests
        </span>
        <div className="flex flex-wrap gap-[5px]">
          {researchInterests.map((t) => (
            <span key={t} className="font-mono text-[10.5px] py-[2px] px-[7px] rounded bg-bg-2 border border-rule text-ink-2 whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
