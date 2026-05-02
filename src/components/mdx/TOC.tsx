import type { ReactElement } from "react";

/** Matches the shape produced by `rehype-extract-toc` (TOC from MDX pipeline). */
export type TocItem = {
  id: string;
  value: string;
  children?: TocItem[];
};

export type Toc = TocItem[];

// recursively render the table of contents
function renderToc(toc: Toc): ReactElement[] {
  return toc.map((item) => {
    return (
      <li key={item.id} className="pl-2 my-2">
        <a href={`#${item.id}`}>{item.value}</a>

        {item.children && item.children.length > 0 && (
          <ol className="py-0 my-2 pl-5">{renderToc(item.children)}</ol>
        )}
      </li>
    );
  });
}

export default function TOC({ title, toc }: { title: string; toc: Toc }) {
  return (
    <div>
      <h2>{title}</h2>
      <ol className="pl-5">{toc.length > 0 && renderToc(toc)}</ol>
    </div>
  );
}
