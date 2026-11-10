import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { prismPlugin, katexPlugin, externalLinksPlugin } from "./src/lib/satteri-plugins.mjs";

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

/** Injects <link rel="modulepreload"> for transitive island dependencies. */
function islandModulePreload() {
  return {
    name: "island-modulepreload",
    hooks: {
      "astro:build:done"({ dir }) {
        const distPath = fileURLToPath(dir).replace(/\/$/, "");
        const astroPath = join(distPath, "_astro");

        // Build a map of chunk -> direct imports from the _astro directory
        const chunkImports = new Map();
        for (const file of readdirSync(astroPath)) {
          if (!file.endsWith(".js")) continue;
          const src = readFileSync(join(astroPath, file), "utf8");
          const imports = [...src.matchAll(/from\s*["']([^"']+)["']/g)]
            .map((m) => m[1].replace("./", ""))
            .filter((f) => f.endsWith(".js"));
          chunkImports.set(file, imports);
        }

        // Walk all HTML files and patch them
        function patchDir(dirPath) {
          for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
            const full = join(dirPath, entry.name);
            if (entry.isDirectory()) {
              patchDir(full);
              continue;
            }
            if (!entry.name.endsWith(".html")) continue;

            let html = readFileSync(full, "utf8");
            const urlRe = /(?:component|renderer)-url="(\/_astro\/([^"]+))"/g;
            const toPreload = new Set();
            let m;
            while ((m = urlRe.exec(html)) !== null) {
              const file = m[2];
              toPreload.add(file);
              for (const dep of chunkImports.get(file) ?? []) toPreload.add(dep);
            }
            if (!toPreload.size) continue;

            const tags = [...toPreload]
              .map((f) => `<link rel="modulepreload" href="/_astro/${f}">`)
              .join("");
            html = html.replace("</head>", tags + "</head>");
            writeFileSync(full, html);
          }
        }
        patchDir(distPath);
      },
    },
  };
}

/** Publication pages under review are noindexed, so keep them out of the sitemap too. */
const pendingPublicationPaths = JSON.parse(
  readFileSync(new URL("./src/data/publications.override.json", import.meta.url), "utf8"),
)
  .filter((p) => ["under_review", "submitted", "in_preparation"].includes(p.status))
  .flatMap((p) => [p.id, p.slug].filter(Boolean))
  .map((slug) => `/publications/${slug}`);

/** Publish date per article, for <lastmod> in the sitemap. */
const articleDates = Object.fromEntries(
  readdirSync(new URL("./src/content/articles", import.meta.url))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const text = readFileSync(new URL(`./src/content/articles/${file}`, import.meta.url), "utf8");
      const date = /^publishedAt:\s*["']?([^"'\r\n]+)/m.exec(text)?.[1];
      return [file.replace(/\.mdx$/, ""), date ? new Date(date).toISOString() : undefined];
    }),
);

export default defineConfig({
  site: "https://mirsazzathossain.me",
  trailingSlash: "never",

  output: "static",
  adapter: vercel(),
  compressHTML: true,

  markdown: {
    processor: satteri({
      syntaxHighlight: false,
      features: { math: true },
      hastPlugins: [prismPlugin, katexPlugin, externalLinksPlugin],
    }),
  },

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    server: {
      watch: {
        ignored: ["**/.vercel/**", "**/dist/**", "**/.astro/**"],
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/client",
      ],
    },
    build: {
      commonjsOptions: {
        include: [/react-dom/, /node_modules/],
      },
    },
  },

  integrations: [
    mdx({
      syntaxHighlight: false,
    }),
    react(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, "");
        return (
          !path.startsWith("/articles/list") &&
          !path.startsWith("/articles/tags/") &&
          !path.startsWith("/404") &&
          !pendingPublicationPaths.includes(path)
        );
      },
      serialize: (item) => {
        const slug = /\/articles\/([^/]+)\/?$/.exec(new URL(item.url).pathname)?.[1];
        const lastmod = slug && articleDates[slug];
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    islandModulePreload(),
  ],
});
