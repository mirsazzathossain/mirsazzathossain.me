const dev = process.env.NODE_ENV !== "production";
export const server = dev
  ? "http://localhost:3000"
  : process.env.SITE_URL || "https://mirsazzathossain.me";
