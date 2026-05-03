export const siteUrl = import.meta.env.DEV
  ? "http://localhost:4321"
  : "https://mirsazzathossain.me";

/** @deprecated Use siteUrl — kept for minimal diff during migration */
export const server = siteUrl;
