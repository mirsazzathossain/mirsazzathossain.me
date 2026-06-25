import { defineHastPlugin } from "satteri";
import { satteriMakeFragmentNode } from "@astrojs/markdown-satteri";
import katex from "katex";

function makeRawNode(html) {
  return { type: "raw", value: html };
}

function wrapHtml(html, ctx) {
  return ctx.fileURL?.pathname?.endsWith(".mdx")
    ? satteriMakeFragmentNode(html)
    : makeRawNode(html);
}

export const katexPlugin = defineHastPlugin({
  name: "katex",
  element: {
    filter: ["code"],
    async visit(node, ctx) {
      const classes = node.properties?.className ?? [];
      const isInline = classes.includes("math-inline");
      const isDisplay = classes.includes("math-display");
      if (!isInline && !isDisplay) return;

      const latex = ctx.textContent(node);
      const rendered = katex.renderToString(latex, {
        displayMode: isDisplay,
        throwOnError: false,
        output: "html",
        strict: "ignore",
      });

      return wrapHtml(rendered, ctx);
    },
  },
});

export const externalLinksPlugin = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== "string") return;
      if (!href.startsWith("http://") && !href.startsWith("https://")) return;
      ctx.setProperty(node, "target", "_blank");
      ctx.setProperty(node, "rel", ["noopener", "noreferrer"]);
    },
  },
});
