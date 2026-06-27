/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly GOOGLE_CALENDAR_API_KEY: string;
  readonly GOOGLE_CALENDAR_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
