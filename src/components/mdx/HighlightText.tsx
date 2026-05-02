export default function HighlightText({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <span className="underline underline-offset-0 decoration-8 decoration-green-200 dark:decoration-green-600">
      {children}
    </span>
  );
}
