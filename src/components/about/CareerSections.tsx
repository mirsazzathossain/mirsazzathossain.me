import { formatDegree } from "@/utils/about";
import { OrgLogo } from "./OrgLogo";
import type { Education, Experience } from "./types";

export function EducationList({ educations }: { educations: Education[] }) {
  return (
    <>
      {educations.map((education) => (
        <div
          key={`${education.school}-${education.date}`}
          className="border-rule-2 flex items-start gap-[14px] border-b py-3"
        >
          <OrgLogo name={education.school} />
          <div className="min-w-0 flex-1">
            <h3 className="text-ink m-0 mb-0.5 font-serif text-[15.5px]">
              <a
                href={education.schoolURL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-link transition-colors"
              >
                {education.school}
              </a>
            </h3>
            <p className="text-ink-3 m-0 mb-1 font-serif text-[12.5px]">
              {formatDegree(education.degree, education.major, education.minor)}
            </p>
            <p className="text-ink-2 m-0 font-serif text-[13px] leading-[1.55]">
              {education.description}
            </p>
            {education.activitiesandsocieties && education.activitiesandsocieties.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {education.activitiesandsocieties.map((a) => (
                  <span
                    key={a}
                    className="bg-bg-2 border-rule text-ink-2 rounded border px-[8px] py-[2px] font-mono text-[10px] sm:whitespace-nowrap"
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="text-ink-3 shrink-0 font-mono text-[11px] whitespace-nowrap">
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
            className="border-rule-2 flex items-start gap-[14px] border-b py-3"
          >
            <OrgLogo name={experience.company} />
            <div className="min-w-0 flex-1">
              <h3 className="text-ink m-0 mb-0.5 font-serif text-[15.5px]">{experience.title}</h3>
              <p className="text-ink-3 m-0 mb-1 font-serif text-[12.5px]">
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
              <p className="text-ink-2 m-0 font-serif text-[13px] leading-[1.55]">
                {experience.description}
              </p>
              {experience.skills && experience.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-bg-2 border-rule text-ink-2 rounded border px-[8px] py-[2px] font-mono text-[10px] sm:whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-ink-3 shrink-0 font-mono text-[11px] whitespace-nowrap">
              {experience.date}
            </span>
          </div>
        ))}
    </>
  );
}
