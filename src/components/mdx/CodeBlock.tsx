import { cn } from "@/lib/cn";
import React from "react";
import { CopyDoneIcon, CopyIcon } from "../Icons";

export default function CodeBlock({ children, ...props }: any): JSX.Element {
  const preRef = React.useRef<HTMLPreElement>(null);
  const [hovered, setHovered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(preRef.current?.textContent ?? "");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      {...props}
      className="relative block-code"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <button
          type="button"
          title={copied ? "Copied!" : "Copy to clipboard"}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-md bg-white dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:ring-white/20 ring-1 ring-zinc-900/5",
            copied && "bg-teal-50 dark:bg-teal-900",
          )}
          onClick={onCopy}
        >
          {!copied && (
            <CopyIcon className="h-5 w-5 text-zinc-500 transition dark:text-zinc-400" />
          )}
          {copied && <CopyDoneIcon className="h-5 w-5 text-teal-500" />}
        </button>
      )}
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
