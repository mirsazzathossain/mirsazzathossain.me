import type { Availability } from "./types";

export function AvailabilityCard({
  availability,
  email,
}: {
  availability: Availability;
  email: string;
}) {
  return (
    <div className="border-rule bg-bg my-1 rounded-[10px] border p-[18px]">
      <div className="mb-[14px] flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-ink m-0 mb-[3px] font-serif text-[15px]">
            Typical week — {availability.rangeLabel}
          </p>
          <p className="text-ink-3 m-0 font-serif text-[12px]">
            All times shown in{" "}
            <strong className="text-ink-2 font-semibold">{availability.tz}</strong>. Booked slots in
            pink, free in green.
          </p>
        </div>
        <div className="text-ink-3 flex gap-3 font-mono text-[11px]">
          <span className="inline-flex items-center gap-[5px]">
            <span className="inline-block h-3 w-3 rounded-[3px] border border-emerald-500/50 bg-emerald-500/30" />
            free
          </span>
          <span className="inline-flex items-center gap-[5px]">
            <span
              className="inline-block h-3 w-3 rounded-[3px] border border-red-500/45 bg-red-500/[.22]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 4px, rgb(239 68 68 / 18%) 4px 5px)",
              }}
            />
            busy
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[56px_repeat(7,1fr)] items-stretch gap-[3px]">
        <div />
        {availability.dates.map((date, index) => (
          <div
            key={`${availability.days[index]}-${date}`}
            className="border-rule flex flex-col border-b py-[6px] pb-2 text-center"
          >
            <span className="text-ink-3 font-mono text-[10px] tracking-[0.06em] uppercase">
              {availability.days[index]}
            </span>
            <span className="text-ink mt-0.5 text-[12px] font-medium">{date}</span>
          </div>
        ))}
        {availability.hours.map((hour, rowIndex) => (
          <GridRow
            key={hour}
            hour={hour}
            row={availability.grid[rowIndex] || ""}
            days={availability.days}
          />
        ))}
      </div>
      <p className="text-ink-3 m-0 mt-[14px] font-serif text-[12.5px] italic">
        Shoot me an{" "}
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noreferrer"
          className="text-link hover:text-link-hover not-italic"
        >
          email
        </a>{" "}
        with a 2-3 slot suggestion and I&apos;ll confirm one.
      </p>
    </div>
  );
}

function GridRow({ hour, row, days }: { hour: string; row: string; days: string[] }) {
  return (
    <>
      <div className="text-ink-3 pt-1 pr-2 text-right font-mono text-[10.5px] leading-[1.6]">
        {hour}
      </div>
      {row.split("").map((slot, index) => (
        <div
          key={`${hour}-${days[index]}`}
          className={
            slot === "f"
              ? "min-h-[22px] rounded-[3px] border border-emerald-500/35 bg-emerald-500/[.18]"
              : "min-h-[22px] rounded-[3px] border border-red-500/30 bg-red-500/[.14]"
          }
          style={
            slot === "b"
              ? {
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0 4px, rgb(239 68 68 / 18%) 4px 5px)",
                }
              : undefined
          }
          title={`${days[index]} ${hour}`}
        />
      ))}
    </>
  );
}
