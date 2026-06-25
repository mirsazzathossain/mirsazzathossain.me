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
 * Handles both display math AND Prism syntax highlighting at the <pre> level.
 * By handling display math here, the entire <pre> is replaced — preventing
 * CodeBlock component substitution from wrapping KaTeX output with a copy button.
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

      // Display math — render with KaTeX and replace the whole <pre>
      if (classes.includes("math-display")) {
        const latex = ctx.textContent(codeChild);
        const rendered = katex.renderToString(latex, {
          displayMode: true,
          throwOnError: false,
          output: "html",
          strict: "ignore",
        });
        return wrapHtml(rendered, ctx);
      }

      // Skip inline math (handled by katexPlugin on <code> nodes)
      if (classes.includes("math-inline")) return;

      // Regular code block — apply Prism
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

/** Handles inline math only — display math is handled by prismPlugin at <pre> level. */
export const katexPlugin = defineHastPlugin({
  name: "katex",
  element: {
    filter: ["code"],
    async visit(node, ctx) {
      const classes = node.properties?.className ?? [];
      if (!classes.includes("math-inline")) return;

      const latex = ctx.textContent(node);
      const rendered = katex.renderToString(latex, {
        displayMode: false,
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
