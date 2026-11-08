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
            <strong className="text-ink-2 font-semibold">{availability.tz}</strong>. Booked time in
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
              className="inline-block h-3 w-3 rounded-[3px] border border-red-500/30 bg-red-500/[.14]"
              style={{
                backgroundImage: BUSY_STRIPES,
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
        <div className="flex flex-col gap-[3px]">
          {availability.hours.map((hour) => (
            <div
              key={hour}
              className="text-ink-3 pr-2 text-right font-mono text-[10.5px] leading-[32px]"
              style={{ height: ROW_PX }}
            >
              {hour}
            </div>
          ))}
        </div>
        {availability.days.map((day, dayIndex) => (
          <DayColumn
            key={day}
            day={day}
            hours={availability.hours}
            blocks={busyBlocks(availability, dayIndex)}
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

const BUSY_STRIPES =
  "repeating-linear-gradient(45deg, transparent 0 4px, rgb(239 68 68 / 18%) 4px 5px)";

const ROW_PX = 32;
const GAP_PX = 3;

type Block = { startRow: number; startMin: number; endRow: number; endMin: number };

/** "9am" → 9, "12pm" → 12, "11pm" → 23 */
function hourOf(label: string) {
  const h = parseInt(label, 10) % 12;
  return label.toLowerCase().endsWith("pm") ? h + 12 : h;
}

const pad = (n: number) => String(n).padStart(2, "0");

function clock(label: string, minute: number) {
  const h = hourOf(label) + Math.floor(minute / 60);
  const m = minute % 60;
  const suffix = h % 24 >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${pad(m)}${suffix}`;
}

/** Gaps shorter than this between meetings are too short to book, so they show as busy. */
const MERGE_GAP_MIN = 30;

/**
 * Joins busy minutes for one day into continuous blocks: across hour rows, and
 * across gaps shorter than MERGE_GAP_MIN.
 */
function busyBlocks(availability: Availability, dayIndex: number): Block[] {
  const blocks: (Block & { endAt: number })[] = [];
  availability.hours.forEach((hour, row) => {
    const code = availability.grid[row]?.[dayIndex];
    const segs = availability.segments?.[row]?.[dayIndex] ?? (code === "b" ? [[0, 60]] : []);
    const base = hourOf(hour) * 60;
    for (const [start, end] of segs) {
      const last = blocks[blocks.length - 1];
      if (last && base + start - last.endAt < MERGE_GAP_MIN) {
        last.endRow = row;
        last.endMin = end;
        last.endAt = base + end;
      } else {
        blocks.push({
          startRow: row,
          startMin: start,
          endRow: row,
          endMin: end,
          endAt: base + end,
        });
      }
    }
  });
  return blocks;
}

function DayColumn({ day, hours, blocks }: { day: string; hours: string[]; blocks: Block[] }) {
  const y = (row: number, minute: number) => row * (ROW_PX + GAP_PX) + (minute / 60) * ROW_PX;

  return (
    <div className="relative flex flex-col gap-[3px]">
      {hours.map((hour) => (
        <div
          key={hour}
          className="rounded-[3px] border border-emerald-500/35 bg-emerald-500/[.18]"
          style={{ height: ROW_PX }}
          title={`${day} ${hour}`}
        />
      ))}
      {blocks.map((block) => {
        const top = y(block.startRow, block.startMin);
        const bottom = y(block.endRow, block.endMin);
        return (
          <div
            key={`${block.startRow}-${block.startMin}`}
            className="bg-bg absolute inset-x-0 overflow-hidden rounded-[3px]"
            style={{ top, height: bottom - top }}
            title={`${day} · busy ${clock(hours[block.startRow], block.startMin)}–${clock(hours[block.endRow], block.endMin)}`}
          >
            <div
              className="h-full rounded-[3px] border border-red-500/30 bg-red-500/[.14]"
              style={{ backgroundImage: BUSY_STRIPES }}
            />
          </div>
        );
      })}
    </div>
  );
}
