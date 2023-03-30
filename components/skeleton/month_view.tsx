"use client";
import { useEffect, useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function isEqualsDate(date1: Date, date2: Date) {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1.valueOf() === date2.valueOf();
}

export default function MonthViewSkeleton({
  days,
  today,
}: {
  days: Day[];
  today: Date;
}): JSX.Element {
  const [selected, setSelected] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  useEffect(() => {
    const day = days.find((day) => isEqualsDate(new Date(day.date), selected));
    setSelectedDay(day || null);
  }, [selected, days]);
  return (
    <>
      <div className="shadow ring-1 ring-zinc-100 dark:ring-zinc-700/40 ring-opacity-5 lg:flex lg:flex-auto lg:flex-col bg-zinc-100 dark:bg-zinc-700/40 z-10 relative rounded-b-sm">
        {/* Weekdays start */}
        <div className="grid grid-cols-7 gap-px border-b border-zinc-200 dark:border-zinc-500/40 bg-inherit text-center text-xs font-semibold leading-6 text-zinc-800 dark:text-zinc-100 lg:flex-none">
          <div className="bg-white dark:bg-zinc-900 py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        {/* Weekdays end */}

        <div className="flex bg-inherit text-xs leading-6 text-zinc-800 dark:text-zinc-100 lg:flex-auto">
          {/* Days large start */}
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day: Day) => (
              <div
                key={day.date}
                className={classNames(
                  new Date(day.date).getMonth() === today.getMonth()
                    ? "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
                    : "bg-zinc-50 dark:bg-zinc-800/90 text-zinc-400",
                  "relative py-2 px-3"
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    isEqualsDate(new Date(day.date), new Date())
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 dark:bg-teal-400 font-semibold text-white dark:text-zinc-100"
                      : undefined
                  }
                >
                  {new Date(day.date).getDate()}
                </time>
                <ol className="mt-4 animate-pulse">
                  <li className="group flex mt-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></li>
                  <li className="group flex mt-4 mb-2 h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></li>
                </ol>
              </div>
            ))}
          </div>
          {/* Days large end */}

          {/* Days small start */}
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day: Day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  new Date(day.date).getMonth() === today.getMonth()
                    ? "bg-white dark:bg-zinc-900"
                    : "bg-zinc-50 dark:bg-zinc-800/90",
                  (isEqualsDate(new Date(day.date), new Date(selected)) ||
                    isEqualsDate(new Date(day.date), new Date())) &&
                    "font-semibold",
                  isEqualsDate(new Date(day.date), new Date(selected)) &&
                    "text-white dark:text-zinc-100",
                  !isEqualsDate(new Date(day.date), new Date(selected)) &&
                    isEqualsDate(new Date(day.date), new Date()) &&
                    "text-teal-500 dark:text-teal-400",
                  !isEqualsDate(new Date(day.date), new Date(selected)) &&
                    new Date(day.date).getMonth() === today.getMonth() &&
                    !isEqualsDate(new Date(day.date), new Date()) &&
                    "text-zinc-800 dark:text-zinc-100",
                  !isEqualsDate(new Date(day.date), new Date(selected)) &&
                    !(new Date(day.date).getMonth() === today.getMonth()) &&
                    !isEqualsDate(new Date(day.date), new Date()) &&
                    "text-zinc-400",
                  "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                )}
                onClick={() => {
                  setSelected(new Date(day.date));
                }}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    isEqualsDate(new Date(day.date), new Date(selected)) &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    isEqualsDate(new Date(day.date), new Date(selected)) &&
                      isEqualsDate(new Date(day.date), new Date()) &&
                      "bg-teal-500 dark:bg-teal-400",
                    isEqualsDate(new Date(day.date), new Date(selected)) &&
                      !isEqualsDate(new Date(day.date), new Date()) &&
                      "bg-teal-500 dark:bg-teal-400",
                    "ml-auto"
                  )}
                >
                  {new Date(day.date).getDate()}
                </time>
                <p className="sr-only">{day.events.length} events</p>
                <div className="-mx-0.5 mt-auto flex flex-wrap-reverse animate-pulse w-1/2">
                  <div className="mx-0.5 mb-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
              </button>
            ))}
          </div>
          {/* Days small end */}
        </div>
      </div>
    </>
  );
}
