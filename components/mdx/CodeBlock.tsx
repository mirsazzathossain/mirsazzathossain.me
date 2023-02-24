import clsx from "clsx";
import React from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { CopyDoneIcon, CopyIcon } from "../Icons";

export default function CodeBlock({ children, ...props }: any): JSX.Element {
  const preRef = React.useRef<HTMLPreElement>(null);

  const [hovered, setHovered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setHovered(false);
  };

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(preRef.current?.textContent ?? "");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div
      className="relative block-code"
      {...props}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
    >
      {hovered && (
        <Tooltip
          title={copied ? "Copied!" : "Copy to clipboard"}
          placement="top"
          className="absolute top-2 right-2"
          animation="fade"
          arrow={true}
          size="small"
        >
          <button
            type="button"
            className={clsx(
              "p-2 rounded-md bg-white dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:ring-white/20 ring-1 ring-zinc-900/5",
              copied && "bg-teal-50 dark:bg-teal-900"
            )}
            onClick={onCopy}
          >
            <>
              {!copied && (
                <CopyIcon className="h-5 w-5 text-zinc-500 transition dark:text-zinc-400" />
              )}
              {copied && <CopyDoneIcon className="h-5 w-5 text-teal-500" />}
            </>
          </button>
        </Tooltip>
      )}
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
