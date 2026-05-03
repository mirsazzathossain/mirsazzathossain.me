export default function Step({
  number,
  title,
}: {
  number: number;
  title: string;
}): JSX.Element {
  return (
    <div className="flex items-center mt-8">
      <div className="flex items-center justify-center font-bold rounded-full h-8 w-8 text-teal-500 border border-zinc-200 dark:border-zinc-700/50">
        {number}
      </div>
      <h3 className="my-0 ml-3 font-bold tracking-tight">{title}</h3>
    </div>
  );
}
