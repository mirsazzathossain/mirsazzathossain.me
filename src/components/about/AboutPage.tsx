import { AboutSectionTitle } from "./AboutSection";
import { AboutSidebar } from "./AboutSidebar";
import { AvailabilityCard } from "./AvailabilityCard";
import { EducationList, ExperienceList } from "./CareerSections";
import { PressList } from "./PressList";
import { AwardsList, ServiceGrid, TalksList } from "./RecognitionSections";
import { TimelineList } from "./TimelineList";
import type { AboutPageProps } from "./types";

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
}: AboutPageProps) {
  const bioParagraphs = about.description.split("\n\n").filter(Boolean);
  const email = about.email || "mirsazzathossain@gmail.com";

  return (
    <div>
      <header className="mb-8 max-w-[720px]">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mb-[6px] m-0">
          About
        </p>
        <h1 className="m-0 font-serif text-[clamp(28px,4.5vw,42px)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
          {about.name}
        </h1>
        <p className="mt-3 text-ink-2 text-[15px] max-w-[60ch] m-0">
          {about.designation} at{" "}
          <a
            href={about.company.url}
            className="text-link hover:text-link-hover underline underline-offset-[3px] decoration-[1px] decoration-link/35 hover:decoration-link-hover"
            target="_blank"
            rel="noreferrer"
          >
            {about.company.department.name}
          </a>
          ,{" "}
          <a
            href={about.company.url}
            className="text-ink-2 hover:text-link hover:no-underline"
            target="_blank"
            rel="noreferrer"
          >
            {about.company.name}
          </a>
          .
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-[44px]">
        <AboutSidebar about={about} email={email} />

        <div>
          <AboutSectionTitle first>Bio</AboutSectionTitle>
          {bioParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-serif text-[16px] leading-[1.65] text-ink max-w-[65ch] m-0 mb-[1em]"
            >
              {paragraph}
            </p>
          ))}

          <AboutSectionTitle>Education</AboutSectionTitle>
          <EducationList educations={educations} />

          <AboutSectionTitle>Industry</AboutSectionTitle>
          <ExperienceList
            experiences={experiences}
            category="industry"
            showType
          />

          <AboutSectionTitle>Research</AboutSectionTitle>
          <ExperienceList experiences={experiences} category="research" />

          <AboutSectionTitle>Teaching</AboutSectionTitle>
          <ExperienceList experiences={experiences} category="teaching" />

          <AboutSectionTitle>Honors & Awards</AboutSectionTitle>
          <AwardsList awards={awards} />

          <AboutSectionTitle>Talks & Presentations</AboutSectionTitle>
          <TalksList talks={talks} />

          <AboutSectionTitle>Service & Reviewing</AboutSectionTitle>
          <ServiceGrid service={service} />

          <AboutSectionTitle>Press & Mentions</AboutSectionTitle>
          <PressList press={press} />

          <AboutSectionTitle>Reach Out</AboutSectionTitle>
          <p className="font-serif text-[16px] leading-[1.62] text-ink max-w-[65ch] m-0 mb-4">
            Best ways to get in touch are{" "}
            <a
              href={`mailto:${email}`}
              className="text-link hover:text-link-hover underline underline-offset-[3px] decoration-[1px] decoration-link/35"
            >
              email
            </a>{" "}
            for anything substantive, or DMs on the socials for casual things.
            Currently available for short calls in the windows shaded green —
            most weeks look roughly like this:
          </p>
          <AvailabilityCard availability={availability} email={email} />

          <AboutSectionTitle>Timeline</AboutSectionTitle>
          <TimelineList timeline={timeline} />
        </div>
      </div>
    </div>
  );
}
