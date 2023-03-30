"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClockIcon } from "./icons";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function isEqualsDate(date1: Date, date2: Date) {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1.valueOf() === date2.valueOf();
}

export default function MonthView({
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
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events
                      .slice(0, 2)
                      .map((event: CalEvent, index: number) => (
                        <li key={index}>
                          <Link
                            href={event.link}
                            className="group flex"
                            target="_blank"
                          >
                            <p
                              className={clsx(
                                "flex-auto truncate font-medium group-hover:text-teal-500 dark:group-hover:text-teal-400",
                                new Date(event.date).getMonth() ===
                                  today.getMonth()
                                  ? "text-zinc-800 dark:text-zinc-100"
                                  : "text-zinc-400"
                              )}
                            >
                              {event.title}
                            </p>
                            <time
                              dateTime={event.date}
                              className="ml-3 hidden flex-none text-zinc-500 dark:text-zinc-400 group-hover:text-teal-500 dark:group-hover:text-teal-40 xl:block"
                            >
                              {new Date(
                                event.date + " " + event.startTime
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                              })}
                            </time>
                          </Link>
                        </li>
                      ))}
                    {day.events.length > 2 && (
                      <li className="text-zinc-500 dark:text-zinc-400">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
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
                {day.events.length > 0 && (
                  <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event: CalEvent, index: number) => (
                      <div
                        key={index}
                        className={clsx(
                          "mx-0.5 mb-1 h-1.5 w-1.5 rounded-full",
                          new Date(event.date).getMonth() === today.getMonth()
                            ? "bg-zinc-400"
                            : "bg-zinc-400/60"
                        )}
                      />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
          {/* Days small end */}
        </div>
      </div>
      {/* Events on selected day start */}
      {(selectedDay as any)?.events.length > 0 && (
        <div className="py-10 lg:hidden">
          <ol className="divide-y divide-zinc-100 dark:divide-zinc-700/40 overflow-hidden rounded-lg bg-inherent text-sm shadow ring-1 ring-zinc-100 dark:ring-zinc-700/40 ring-opacity-5">
            {(selectedDay as any).events.map(
              (event: CalEvent, index: number) => (
                <li
                  key={index}
                  className="group flex p-4 pr-6 focus-within:bg-zinc-50 hover:bg-zinc-50 dark:focus-within:bg-zinc-800/90 dark:hover:bg-zinc-800/90"
                >
                  <div className="flex-auto">
                    <Link
                      className="font-semibold text-zinc-800 dark:text-zinc-100"
                      href={event.link}
                      target="_blank"
                    >
                      {event.title}
                    </Link>
                    <time
                      dateTime={event.date}
                      className="mt-2 flex items-center text-zinc-500 dark:text-zinc-400"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-zinc-400 dark:text-zinc-300"
                        aria-hidden="true"
                      />
                      {new Date(
                        event.date + " " + event.startTime
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      {" - "}
                      {new Date(
                        event.date + " " + event.endTime
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </time>
                  </div>
                </li>
              )
            )}
          </ol>
        </div>
      )}
      {/* Events on selected day end */}
    </>
  );
}
