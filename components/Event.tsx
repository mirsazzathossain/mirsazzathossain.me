import { BsPatchCheckFill } from "react-icons/bs";

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
        <BsPatchCheckFill className="text-blue-500 mr-2" />

        <p className="font-medium text-zinc-800 dark:text-zinc-100">{title}</p>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 ml-6">{children}</p>
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
