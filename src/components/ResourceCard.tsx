

export default function ResourceCard({
  resource,
}: {
  resource: Resource;
}): JSX.Element {
  return (
    <a
      href={resource.url}
      className="group block p-[12px_14px] border border-rule rounded-[8px] bg-bg hover:border-ink-3 hover:no-underline transition-colors"
      target="_blank"
      rel="noreferrer"
    >
      <div className="font-mono text-[10.5px] text-ink-3 inline-flex items-center gap-1">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        {new URL(resource.url).hostname.replace("www.", "")}
      </div>
      <h3 className="font-serif text-[14px] font-semibold text-ink leading-[1.3] m-[4px_0]">
        {resource.title}
      </h3>
      <p className="text-[12.5px] text-ink-2 leading-[1.5] m-0">
        {resource.description}
      </p>
    </a>
  );
}
