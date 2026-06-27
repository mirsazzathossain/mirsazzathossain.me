import { SocialIconLink } from "@/components/social/SocialIconLink";
import type { About } from "@/components/about/types";

export default function ProfileSidebar({ about }: { about: About }) {
  const researchInterests: string[] = (about && (about.researchInterests || about.interests)) ?? [
    "Computer Vision",
    "Domain Adaptation",
    "Astrophysical ML",
  ];

  return (
    <aside className="flex flex-col items-center self-start text-center">
      <img
        className="mx-auto mb-[18px] block h-[132px] w-[132px] rounded-full object-cover shadow-lg shadow-slate-900/10"
        src={
          about.photo === "/images/user.webp"
            ? "/images/user-132.webp"
            : about.photo || "/images/user-132.webp"
        }
        alt={about.name}
        width={132}
        height={132}
        loading="eager"
        decoding="async"
      />

      <h1 className="text-ink m-0 mb-1 font-serif text-[24px] leading-[1.15] font-semibold tracking-[-0.02em]">
        {about.name}
      </h1>

      <p className="text-ink-2 m-0 mb-[6px] text-[13.5px] leading-[1.4]">{about.designation}</p>

      <p className="text-ink-3 m-0 mb-3 flex flex-col items-center text-[12.5px] leading-[1.5]">
        <a
          href={about.company.department?.url || about.company.url}
          className="text-link hover:text-link-hover decoration-link/35 py-1 underline underline-offset-[3px]"
        >
          {about.company.department?.name || about.company.name}
        </a>
        <a href={about.company.url} className="text-ink-3 hover:text-link-hover py-1">
          {about.company.name}
        </a>
      </p>

      {about.availability && (
        <span className="mb-[14px] inline-flex items-center gap-[7px] rounded-full border border-emerald-200 bg-emerald-50 py-1 pr-[10px] pl-2 font-mono text-[11.5px] text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-900/20 dark:text-emerald-300">
          <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-emerald-500 shadow-[0_0_0_3px] shadow-emerald-500/20" />
          {about.availability}
        </span>
      )}

      <ul className="m-0 mt-3 flex list-none flex-wrap justify-center gap-1.5 p-0">
        {about.academicLinks?.map((s: { name: string; url: string }) => {
          return (
            <li key={s.name}>
              <SocialIconLink name={s.name} url={s.url} />
            </li>
          );
        })}
      </ul>

      <div className="border-rule mt-4 flex w-full flex-col border-t border-dashed pt-[14px] text-left">
        <span className="text-ink-3 mb-2 block font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase">
          Research interests
        </span>
        <div className="flex flex-wrap gap-[5px]">
          {researchInterests.map((t) => (
            <span
              key={t}
              className="bg-bg-2 border-rule text-ink-2 rounded border px-[7px] py-[2px] font-mono text-[9.3px] whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
