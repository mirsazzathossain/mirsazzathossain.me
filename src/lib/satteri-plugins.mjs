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

/**
 * Prism syntax highlighting — runs on <pre> elements and skips math blocks.
 * Must come BEFORE katexPlugin so it doesn't steal display-math <pre> nodes.
 */
export const prismPlugin = defineHastPlugin({
  name: "prism-highlight",
  element: {
    filter: ["pre"],
    async visit(node, ctx) {
      const codeChild = node.children?.find(
        (c) => c.type === "element" && c.tagName === "code",
      );
      if (!codeChild || codeChild.type !== "element") return;

      const classes = codeChild.properties?.className ?? [];
      // Skip math display blocks — katexPlugin handles these
      if (classes.includes("math-display") || classes.includes("math-inline")) return;

      const lang = codeChild.data?.lang ?? "plaintext";
      const code = ctx.textContent(codeChild).replace(/\n$/, "");

      const { runHighlighterWithAstro } = await import(
        "@astrojs/prism/dist/highlighter"
      );
      const { html, classLanguage } = await runHighlighterWithAstro(lang, code);
      const highlighted = `<pre class="${classLanguage}" data-language="${lang}"><code class="${classLanguage}">${html}</code></pre>`;

      return wrapHtml(highlighted, ctx);
    },
  },
});

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

      // For display math, the <code> is inside a <pre> — the <pre> parent
      // will be replaced when this <code> node is replaced. Wrap appropriately.
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
