import { SearchIcon } from "@/components/Icons";

export function SearchField({
  value,
  onChange,
  placeholder,
  label,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}) {
  return (
    <label
      className={`inline-flex items-center gap-[7px] py-1.5 px-3 border border-rule rounded-full bg-bg min-w-full sm:min-w-[260px] lg:min-w-[320px] text-ink-3 ${className}`}
    >
      <SearchIcon className="h-[13px] w-[13px] shrink-0" />
      <span className="sr-only">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-0 outline-none bg-transparent font-sans text-[13px] text-ink placeholder:text-ink-3"
      />
    </label>
  );
}
