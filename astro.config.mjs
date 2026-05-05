import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

/** Injects <link rel="modulepreload"> for transitive island dependencies. */
function islandModulePreload() {
  return {
    name: "island-modulepreload",
    hooks: {
      "astro:build:done"({ dir }) {
        const distPath = dir.pathname.replace(/\/$/, "");
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
            if (entry.isDirectory()) { patchDir(full); continue; }
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

export default defineConfig({
  // ✅ MUST match your Vercel primary domain
  site: "https://www.mirsazzathossain.me",

  output: "static",
  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },

  vite: {
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
      syntaxHighlight: "prism",
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    react(),
    sitemap(),
    islandModulePreload(),
  ],
});
