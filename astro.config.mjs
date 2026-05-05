import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  // ✅ MUST match your Vercel primary domain
  site: "https://www.mirsazzathossain.me",

  output: "static",
  adapter: vercel(),

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
  ],
});
