
import { ExternalLinkIcon } from "@/components/Icons";
import { getHostnameLabel } from "@/utils/url";

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
        <ExternalLinkIcon className="w-3 h-3" />
        {getHostnameLabel(resource.url)}
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
