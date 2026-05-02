module.exports = {
  plugins: {
    // Use Lightning CSS in dev too (without minify) so emitted declarations keep
    // PostCSS `from`/source info. Otherwise Vite warns:
    // "A PostCSS plugin did not pass the `from` option to `postcss.parse`"
    // when rewriting url(...) — tailwindlabs/tailwindcss#13591.
    "@tailwindcss/postcss": {
      optimize: {
        minify: process.env.NODE_ENV === "production",
      },
    },
  },
};
