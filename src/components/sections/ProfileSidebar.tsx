import { SocialIconLink } from "@/components/social/SocialIconLink";

export default function ProfileSidebar({ about }: { about: any }) {
  const researchInterests: string[] = (about &&
    (about.researchInterests || about.interests)) ?? [
    "Computer Vision",
    "Domain Adaptation",
    "Astrophysical ML",
  ];

  return (
    <aside className="self-start text-center flex flex-col items-center">
      <img
        className="w-[132px] h-[132px] rounded-full object-cover shadow-lg shadow-slate-900/10 block mx-auto mb-[18px]"
        src={about.photo || "/images/user.png"}
        alt={about.name}
      />

      <h1 className="font-serif text-[24px] leading-[1.15] m-0 mb-1 tracking-[-0.02em] text-ink font-semibold">
        {about.name}
      </h1>

      <p className="text-[13.5px] text-ink-2 m-0 mb-[6px] leading-[1.4]">
        {about.designation}
      </p>

      <p className="text-[12.5px] text-ink-3 m-0 mb-3 leading-[1.5] flex flex-col items-center">
        <a
          href={about.company.department?.url || about.company.url}
          className="text-link hover:text-link-hover underline decoration-link/35 underline-offset-[3px]"
        >
          {about.company.department?.name || about.company.name}
        </a>
        <a
          href={about.company.url}
          className="text-ink-3 hover:text-link-hover"
        >
          {about.company.name}
        </a>
      </p>

      {about.availability && (
        <span className="inline-flex items-center gap-[7px] py-1 pl-2 pr-[10px] border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500/30 dark:text-emerald-300 rounded-full text-[11.5px] text-emerald-800 font-mono mb-[14px]">
          <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_0_3px] shadow-emerald-500/20 animate-pulse" />
          {about.availability}
        </span>
      )}

      <ul className="list-none p-0 m-0 mt-3 flex gap-1.5 justify-center flex-wrap">
        {about.academicLinks.map((s: any) => {
          return (
            <li key={s.name}>
              <SocialIconLink name={s.name} url={s.url} />
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
            <span
              key={t}
              className="font-mono text-[9.3px] py-[2px] px-[7px] rounded bg-bg-2 border border-rule text-ink-2 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
