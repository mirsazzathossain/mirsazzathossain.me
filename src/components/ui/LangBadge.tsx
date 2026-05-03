/**
 * LangBadge — coloured language icon for course cards.
 * Matches the design's `.lang-badge` style exactly.
 */

const LANG_META: Record<string, { label: string; color: string; glyph: string }> = {
  python:     { label: "Python",     color: "#3572A5", glyph: "Py"  },
  office:     { label: "Office",     color: "#D24726", glyph: "Off" },
  bash:       { label: "Bash",       color: "#4EAA25", glyph: "$_"  },
  shell:      { label: "Shell",      color: "#4EAA25", glyph: "$_"  },
  javascript: { label: "JavaScript", color: "#f1e05a", glyph: "JS"  },
  typescript: { label: "TypeScript", color: "#3178C6", glyph: "TS"  },
  latex:      { label: "LaTeX",      color: "#3D6117", glyph: "TeX" },
  yaml:       { label: "YAML",       color: "#cb171e", glyph: "Y"   },
  sql:        { label: "SQL",        color: "#e38c00", glyph: "SQL" },
  rust:       { label: "Rust",       color: "#dea584", glyph: "Rs"  },
  cpp:        { label: "C++",        color: "#f34b7d", glyph: "C++" },
  r:          { label: "R",          color: "#198CE7", glyph: "R"   },
};

interface LangBadgeProps {
  lang: string;
  /** Badge size in px — default 36 to match design */
  size?: number;
}

export function LangBadge({ lang, size = 36 }: LangBadgeProps) {
  const key = lang.toLowerCase();
  const meta = LANG_META[key] ?? { label: lang, color: "#94a3b8", glyph: "</>" };

  return (
    <span
      title={meta.label}
      aria-label={meta.label}
      style={{
        width: size,
        height: size,
        background: meta.color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        borderRadius: 7,
        color: "#fff",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "-0.02em",
        boxShadow: "0 1px 2px rgba(0,0,0,.18), inset 0 0 0 1px rgba(255,255,255,.12)",
        textShadow: "0 1px 0 rgba(0,0,0,.2)",
        userSelect: "none",
      }}
    >
      {meta.glyph}
    </span>
  );
}
