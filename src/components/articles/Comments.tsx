"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export default function Comments(): JSX.Element {
  const [giscusTheme, setGiscusTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const sync = (): void => {
      setGiscusTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("colorschemechange", sync);
    return () => {
      obs.disconnect();
      window.removeEventListener("colorschemechange", sync);
    };
  }, []);

  return (
    <section className="mt-9 rounded-[10px] border border-dashed border-rule bg-bg-2 p-[22px] text-[13px] text-ink-3">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
          Comments
        </h2>
        <p className="mb-0 mt-2 leading-[1.6]">
          Join the discussion here or continue it on{" "}
          <a
            href="https://github.com/mirsazzathossain/mirsazzathossain.me/discussions/"
            target="_blank"
            rel="noreferrer"
            className="text-link underline decoration-link/30 underline-offset-4 hover:decoration-link"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <div className="mt-5 text-left">
        <Giscus
          key={giscusTheme}
          id="comments"
          repo="mirsazzathossain/mirsazzathossain.me"
          repoId="R_kgDOH7B9og"
          category="General"
          categoryId="DIC_kwDOH7B9os4CTPDr"
          mapping="pathname"
          data-strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={giscusTheme === "dark" ? "dark" : "light"}
          lang="en"
          loading="lazy"
        />
      </div>
    </section>
  );
}
