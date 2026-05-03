"use client";

import { Container } from "@/components/Container";
import { ResumeIcon } from "@/components/Icons";
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
} from "@/components/SocialIcons";

function SocialLink({
  icon: Icon,
  href,
  title,
  download,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  href: string;
  title?: string | null;
  download?: boolean;
}): JSX.Element | null {
  if (!Icon) return null;
  return (
    <a
      href={href}
      className="group -m-1 p-1"
      target="_blank"
      rel="noreferrer"
      title={title ?? undefined}
      download={download}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

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
  return null;
}

function pickTitle(name: string): string | null {
  if (name === "github") return "GitHub Profile";
  if (name === "linkedin") return "LinkedIn Profile";
  if (name === "twitter") return "Twitter Profile";
  if (name === "google-scholar") return "Google Scholar Profile";
  if (name === "semantic-scholar") return "Semantic Scholar Profile";
  if (name === "dblp") return "DBLP Profile";
  if (name === "researchgate") return "ResearchGate Profile";
  if (name === "orcid") return "ORCID Profile";
  if (name === "acm-dl") return "ACM Digital Library Profile";
  return null;
}

export default function AboutSection({ about }: { about: any }): JSX.Element {
  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {about.name}
        </h1>
        <h2 className="mb-4 tracking-tighter text-gray-600 dark:text-gray-400">
          {about.designation} at{" "}
          <a
            className="font-semibold text-teal-600 hover:underline dark:text-teal-400"
            href={about.company.url}
            target="_blank"
            rel="noreferrer"
          >
            {about.company.name}
          </a>
        </h2>
        <p className="mt-6 whitespace-pre-line text-justify text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {about.description}
        </p>

        {about.note && (
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            <b>*Note:</b> {about.note}
          </p>
        )}

        <div className="mt-6 flex gap-5">
          {about.socialLinks.map((socialLink: { url: string; name: string }, index: number) => (
            <SocialLink
              key={index}
              href={socialLink.url}
              icon={pickIcon(socialLink.name)}
              title={pickTitle(socialLink.name)}
            />
          ))}
          <SocialLink
            href={about.resume}
            title="Download Resume"
            icon={ResumeIcon}
            download
          />
        </div>
      </div>
    </Container>
  );
}
