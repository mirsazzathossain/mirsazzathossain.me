import { getOrgLogo } from "@/utils/about";

export function OrgLogo({ name }: { name: string }) {
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
