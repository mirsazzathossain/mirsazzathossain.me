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
    <div className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Comments
      </h2>
      <p className="mt-2 mb-4 text-base text-zinc-600 dark:text-zinc-400">
        Do you have a problem, want to share feedback, or discuss further ideas?
        Feel free to leave a comment here! Please stick to English. This comment
        thread directly maps to a{" "}
        <a
          href="https://github.com/mirsazzathossain/mirsazzathossain.me/discussions/"
          target="_blank"
          rel="noreferrer"
        >
          <em className="text-teal-500">discussion on GitHub</em>
        </a>
        , so you can also comment there if you prefer.
      </p>
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
      <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
        Instead of authenticating the{" "}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noreferrer"
          className="text-teal-500"
        >
          giscus
        </a>{" "}
        application, you can also comment directly{" "}
        <a
          href="https://github.com/mirsazzathossain/mirsazzathossain.me/discussions?discussions"
          target="_blank"
          rel="noreferrer"
        >
          <em className="text-teal-500">on GitHub</em>
        </a>
        .
      </p>
    </div>
  );
}
