"use client";
import { useEffect, useMemo, useState } from "react";
import MonthViewSkeleton from "../skeleton/month_view";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import MonthView from "./month_view";

function getMonthStartEnd(date: Date) {
  const start = new Date(date);
  start.setDate(1);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 41);
  return [start, end];
}

function getDays(start: Date, end: Date): Day[] {
  const response: Day[] = [];

  const days = Math.floor((end.getTime() - start.getTime()) / 86400000);
  for (let i = 1; i <= days + 1; i++) {
    const date = new Date(start.getTime() + i * 86400000);
    response.push({
      date: date.toISOString().split("T")[0],
      events: [],
    });
  }

  return response;
}

export default function MainView(): JSX.Element {
  const [selected, setSelected] = useState(new Date());

  const [start, end] = useMemo(() => {
    return getMonthStartEnd(selected);
  }, [selected]);

  const [days, setDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/google-calendar-events?start=" + start + "&end=" + end)
      .then((res) => res.json())
      .then((data) => {
        setDays(data);
        setLoading(false);
      });
  }, [start, end]);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      {/* start of calendar header */}
      <header className="relative flex items-center justify-between py-4 px-6 lg:flex-none border-b border-zinc-100 dark:border-zinc-700/40 bg-zinc-50 dark:bg-zinc-800/90 shadow ring-1 ring-zinc-100 dark:ring-zinc-700/40 ring-opacity-5 rounded-t-sm">
        {/* start of calendar title */}
        <div>
          <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            <time dateTime={selected.toISOString()}>
              {selected.toLocaleString("en-US", { month: "long" })}{" "}
              {selected.getFullYear()}
            </time>
          </h1>
        </div>
        {/* end of calendar title */}

        <div className="flex items-center">
          {/* start of date navigator */}
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-zinc-100 dark:border-zinc-700/40 bg-white dark:bg-zinc-900 py-2 pl-3 pr-4 text-zinc-800 dark:text-zinc-100 focus:relative md:w-9 md:px-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/90"
              onClick={() => {
                let prev = new Date(selected);
                prev.setDate(1);
                if (prev.getMonth() === 0) {
                  prev.setFullYear(prev.getFullYear() - 1);
                  prev.setMonth(11);
                } else {
                  prev.setMonth(prev.getMonth() - 1);
                }
                setSelected(prev);
              }}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-zinc-100 dark:border-zinc-700/40 bg-white dark:bg-zinc-900 px-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/90 focus:relative md:block"
              onClick={() => {
                setSelected(new Date());
              }}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-zinc-100 dark:bg-zinc-700/40 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-zinc-100 dark:border-zinc-700/40 bg-white dark:bg-zinc-900 py-2 pl-4 pr-3 text-zinc-800 dark:text-zinc-100 focus:relative md:w-9 md:px-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/90"
              onClick={() => {
                let next = new Date(selected);
                next.setDate(1);
                if (next.getMonth() === 11) {
                  next.setFullYear(next.getFullYear() + 1);
                  next.setMonth(0);
                } else {
                  next.setMonth(next.getMonth() + 1);
                }
                setSelected(next);
              }}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {/* end of date navigator */}
        </div>
      </header>
      {/* end of calendar header */}

      {/* start of calendar body */}
      {!loading ? (
        <MonthView days={days} today={selected} />
      ) : (
        <MonthViewSkeleton days={getDays(start, end)} today={selected} />
      )}

      {/* end of calendar body */}
    </div>
  );
}
