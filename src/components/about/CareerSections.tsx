import { formatDegree } from "@/utils/about";
import { OrgLogo } from "./OrgLogo";
import type { Education, Experience } from "./types";

export function EducationList({ educations }: { educations: Education[] }) {
  return (
    <>
      {educations.map((education) => (
        <div
          key={`${education.school}-${education.date}`}
          className="flex gap-[14px] items-start py-3 border-b border-rule-2"
        >
          <OrgLogo name={education.school} />
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">
              <a
                href={education.schoolURL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-link transition-colors"
              >
                {education.school}
              </a>
            </h3>
            <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1">
              {formatDegree(education.degree, education.major, education.minor)}
            </p>
            <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
              {education.description}
            </p>
            {education.activitiesandsocieties &&
              education.activitiesandsocieties.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {education.activitiesandsocieties.map((a) => (
                    <span
                      key={a}
                      className="font-mono text-[10px] py-[2px] px-[8px] rounded bg-bg-2 border border-rule text-ink-2 whitespace-nowrap"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
          </div>
          <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">
            {education.date}
          </span>
        </div>
      ))}
    </>
  );
}

export function ExperienceList({
  experiences,
  category,
  showType = false,
}: {
  experiences: Experience[];
  category: Experience["category"];
  showType?: boolean;
}) {
  return (
    <>
      {experiences
        .filter((experience) => experience.category === category)
        .map((experience) => (
          <div
            key={`${experience.title}-${experience.company}-${experience.date}`}
            className="flex gap-[14px] items-start py-3 border-b border-rule-2"
          >
            <OrgLogo name={experience.company} />
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[15.5px] text-ink m-0 mb-0.5">
                {experience.title}
              </h3>
              <p className="font-serif text-[12.5px] text-ink-3 m-0 mb-1">
                <a
                  href={experience.companyURL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-link transition-colors"
                >
                  {experience.company}
                </a>
                {showType && ` · ${experience.type}`}
              </p>
              <p className="font-serif text-[13px] text-ink-2 m-0 leading-[1.55]">
                {experience.description}
              </p>
              {experience.skills && experience.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] py-[2px] px-[8px] rounded bg-bg-2 border border-rule text-ink-2 whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="font-mono text-[11px] text-ink-3 whitespace-nowrap shrink-0">
              {experience.date}
            </span>
          </div>
        ))}
    </>
  );
}
