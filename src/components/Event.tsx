function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.8 14.1L7 13l1.4-1.4 1.8 1.8 5.7-5.7L17 9.3l-6.8 6.8z" />
    </svg>
  );
}

const Year = ({ children }: { children: any }) => {
  return (
    <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-zinc-800 dark:text-zinc-100">
      {children}
    </h3>
  );
};

const Step = ({ title, children }: { title: string; children: any }) => {
  return (
    <li className="mb-4 ml-2">
      <div className="flex items-center mb-2">
        <span className="sr-only">Check</span>
        <CheckIcon className="h-5 w-5 text-blue-500 mr-2 shrink-0" />

        <p className="font-medium text-zinc-800 dark:text-zinc-100">{title}</p>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 ml-6 text-justify">
        {children}
      </p>
    </li>
  );
};

export default function Event({
  year,
  events,
}: {
  year: string;
  events: any;
}): JSX.Element {
  return (
    <>
      <Year>{year}</Year>
      <ul>
        {events.map((event: any, index: number) => (
          <Step key={index} title={event.title}>
            {event.description}
          </Step>
        ))}
      </ul>
    </>
  );
}
