import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

// ─── UI / Navigation ─────────────────────────────────────────────────────────

export function DiamondIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M5 7.2 12 3l7 4.2v9.6L12 21l-7-4.2Z" />
    </svg>
  );
}

export function SearchIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function MagnifyingGlassIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ChevronDownIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronUpIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path d="M1.75 4.25 4 1.75l2.25 2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M8.75 4.75 12.25 8m0 0-3.5 3.25M12.25 8h-8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export function SunIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" fill="none" />
    </svg>
  );
}

export function MoonIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export function LinkIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function ExternalLinkIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function AnchorIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function DownloadIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function CopyIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CopyDoneIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
    </svg>
  );
}

// ─── Misc / Utility ───────────────────────────────────────────────────────────

export function PinIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function EmailIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function CalendarIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function UsersIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function RssIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}

// ─── Publication links ────────────────────────────────────────────────────────

export function FileIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function CodeIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function SlidesIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function PosterIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  );
}

export function VideoIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

export function CiteIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 21c3-1 5-4 5-8H4V5h8v8c0 3-2 7-9 8zm12 0c3-1 5-4 5-8h-4V5h8v8c0 3-2 7-9 8z" />
    </svg>
  );
}

// ─── Social (sharing) ─────────────────────────────────────────────────────────

export function TwitterIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FacebookIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3V4h-3a5 5 0 0 0-5 5v2H7" />
    </svg>
  );
}

export function WhatsAppIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.95L.08 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.16-3.47-8.42zM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.74.98 1-3.64-.24-.38a9.84 9.84 0 0 1-1.5-5.26C2.2 6.45 6.64 2 12.1 2a9.8 9.8 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.13 4.53.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

// ─── Academic platforms ───────────────────────────────────────────────────────

export function GitHubIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a10.5 10.5 0 0 0-5.5 0C8.5 2 7.5 2 7.5 2a6.5 6.5 0 0 0 0 3.5c-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedInIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 1 0-4 0" />
      <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4L3 7" />
    </svg>
  );
}

export function DiscordIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
      <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
      <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833-1.667 3.5-3c.667-1.667.5-5.833-1.5-11.5c-1.457-1.015-3-1.34-4.5-1.5l-.972 1.923a11.913 11.913 0 0 0-4.053 0L9 4c-1.5.16-3.043.485-4.5 1.5c-2 5.667-2.167 9.833-1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2-2 2-3" />
      <path d="M7 16.5c3.5 1 6.5 1 10 0" />
    </svg>
  );
}

export function TwitterXIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

export function DriveIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.001 2.25 3.75 14.25h8.252L21.75 2.25H12.001z" />
      <path d="M3.75 14.25 12 22.5l8.25-8.25H3.75z" opacity="0.9" />
      <path d="M12 2.25 20.25 14.25 12 22.5 3.75 14.25 12 2.25z" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function ACMIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m7.435 12.25c-.08.025-.15.072-.202.135-.048.072-.073.158-.07.245 0 .15.038.252.12.308.077.056.194.082.352.082.087 0 .174-.02.264-.06.09-.038.174-.095.245-.165v-.66c-.168.015-.303.03-.405.045-.105.01-.207.034-.305.07zm4.565-12.25-12 12 12 12 12-12zm0 19.357c-4.062-.002-7.355-3.294-7.357-7.357.002-4.062 3.295-7.356 7.357-7.358 4.063.002 7.355 3.295 7.357 7.358-.002 4.063-3.294 7.355-7.357 7.357zm0-13.98v.002c-3.654 0-6.62 2.966-6.62 6.62s2.966 6.62 6.62 6.62 6.62-2.966 6.62-6.62c0-3.656-2.964-6.62-6.62-6.623zm-2.862 8.246h-.995v-.336l-.182.154c-.142.108-.304.188-.477.233-.082.02-.202.035-.352.035-.262.007-.515-.097-.698-.285-.187-.19-.277-.426-.277-.716 0-.238.046-.427.14-.574.1-.15.24-.27.405-.348.205-.09.423-.152.646-.18.25-.033.516-.06.803-.078v-.017c0-.176-.066-.297-.196-.363-.13-.07-.322-.102-.58-.102-.117 0-.254.02-.41.063-.158.044-.308.1-.458.164h-.087v-.77c.097-.03.256-.062.48-.1.217-.04.438-.06.663-.06.55 0 .95.092 1.2.276.25.183.375.462.375.837v2.168zm3.22-.167c-.07.028-.134.056-.2.086-.074.03-.15.058-.23.08-.094.024-.186.044-.27.06-.084.014-.196.022-.336.022-.263 0-.506-.033-.723-.1-.21-.062-.406-.165-.57-.307-.163-.142-.292-.32-.373-.52-.09-.21-.135-.457-.135-.738-.008-.27.042-.535.146-.78.09-.204.224-.384.392-.53.165-.134.355-.233.56-.29.22-.066.447-.096.675-.096.37 0 .732.087 1.06.255v.854h-.127c-.048-.043-.096-.085-.147-.124-.06-.048-.122-.09-.188-.126-.167-.095-.357-.144-.55-.14-.254 0-.45.086-.59.263-.138.177-.21.414-.21.714 0 .32.075.56.225.715.15.157.347.235.592.235.11 0 .222-.013.33-.042.153-.043.295-.12.415-.225.048-.04.088-.082.123-.11h.13v.843zm4.333.173v-1.597c0-.157 0-.29-.007-.397-.002-.09-.02-.18-.052-.263-.023-.066-.07-.12-.13-.15-.153-.064-.325-.063-.478.002-.086.04-.168.087-.244.14v2.263h-.993v-1.595c0-.156-.003-.286-.01-.396-.003-.09-.02-.18-.05-.264-.027-.066-.076-.12-.136-.15-.06-.033-.145-.048-.25-.048-.083 0-.165.02-.24.056-.078.04-.152.086-.228.136v2.262h-.995v-3.188h.993v.356c.144-.125.296-.233.46-.323.148-.08.314-.12.484-.12.182-.004.36.045.514.14.153.1.27.244.34.414.19-.177.37-.314.54-.41s.34-.145.515-.145c.136-.002.27.023.396.075.115.044.22.116.3.21.09.106.16.23.2.364.045.142.066.328.066.553v2.076h-.995z" />
    </svg>
  );
}

export function OrcidIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m16 3c-7.1678612 0-13 5.832144-13 13s5.8321388 13 13 13c7.167861 0 13-5.832144 13-13s-5.832139-13-13-13zm0 2c6.086982 0 11 4.9130223 11 11 0 6.086978-4.913018 11-11 11-6.0869817 0-11-4.913022-11-11 0-6.0869777 4.9130183-11 11-11zm-5 3a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm-1 3v11h2v-11zm4 0v1 10h4.5c3.025577 0 5.5-2.474423 5.5-5.5s-2.474423-5.5-5.5-5.5zm2 2h2.5c1.944423 0 3.5 1.555577 3.5 3.5s-1.555577 3.5-3.5 3.5h-2.5z" />
    </svg>
  );
}

export function ResearchGateIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.381 1.235-3.221-.135-.303-.54-1.524.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.697.825.577C20.565 22.092 24 17.592 24 12.297 24 5.67 18.63.297 12 .297z" />
    </svg>
  );
}

export function GoogleScholarIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 30 30.000001" fill="currentColor" preserveAspectRatio="xMidYMid meet" {...props}>
      <defs>
        <clipPath id="google-scholar-clip">
          <path d="M 3.386719 3 L 27.339844 3 L 27.339844 28 L 3.386719 28 Z M 3.386719 3 " clipRule="nonzero" />
        </clipPath>
      </defs>
      <g clipPath="url(#google-scholar-clip)">
        <path d="M 14.660156 3.25 L 3.386719 10.308594 L 11.125 10.308594 C 11.097656 10.417969 11.050781 10.515625 11.027344 10.625 C 10.960938 10.964844 10.910156 11.34375 10.910156 11.734375 C 10.910156 16.773438 16.054688 16.207031 16.054688 16.207031 L 16.054688 17.492188 C 16.054688 18.011719 16.734375 17.832031 16.816406 18.890625 C 16.476562 18.890625 9.691406 18.695312 9.691406 23.277344 C 9.691406 27.882812 15.679688 27.65625 15.679688 27.65625 C 15.679688 27.65625 22.59375 27.964844 22.59375 22.273438 C 22.597656 18.871094 18.636719 17.765625 18.636719 16.398438 C 18.636719 15.015625 21.621094 14.609375 21.621094 11.375 C 21.621094 9.960938 21.523438 8.953125 20.890625 8.238281 C 20.84375 8.1875 20.808594 8.152344 20.761719 8.121094 C 20.75 8.109375 20.738281 8.101562 20.726562 8.09375 L 20.898438 8.09375 L 23.816406 5.902344 L 23.816406 8.898438 C 23.816406 8.953125 23.820312 9.007812 23.832031 9.0625 C 23.609375 9.1875 23.429688 9.363281 23.300781 9.585938 C 23.171875 9.808594 23.109375 10.050781 23.113281 10.308594 L 23.113281 11.722656 C 23.109375 11.910156 23.144531 12.09375 23.214844 12.269531 C 23.285156 12.445312 23.386719 12.597656 23.515625 12.734375 C 23.648438 12.867188 23.804688 12.972656 23.976562 13.042969 C 24.152344 13.117188 24.332031 13.152344 24.519531 13.152344 C 24.710938 13.152344 24.890625 13.117188 25.066406 13.042969 C 25.238281 12.972656 25.390625 12.867188 25.523438 12.734375 C 25.65625 12.597656 25.757812 12.445312 25.828125 12.269531 C 25.898438 12.09375 25.933594 11.910156 25.929688 11.722656 L 25.929688 10.308594 C 25.933594 10.050781 25.871094 9.808594 25.742188 9.585938 C 25.613281 9.363281 25.433594 9.1875 25.207031 9.0625 C 25.21875 9.007812 25.226562 8.953125 25.226562 8.898438 L 25.226562 4.839844 L 27.339844 3.25 Z M 15.632812 7.5625 C 16.039062 7.542969 16.445312 7.640625 16.835938 7.863281 C 17.125 8.007812 17.402344 8.21875 17.644531 8.480469 C 18.148438 8.984375 18.570312 9.714844 18.796875 10.578125 C 19.332031 12.625 18.636719 14.597656 17.191406 14.96875 C 15.765625 15.375 14.171875 14.039062 13.621094 12.007812 C 13.378906 11.015625 13.410156 10.054688 13.6875 9.292969 C 13.691406 9.28125 13.695312 9.273438 13.699219 9.265625 C 13.703125 9.261719 13.710938 9.257812 13.714844 9.253906 C 13.792969 8.953125 13.921875 8.679688 14.082031 8.457031 C 14.371094 8.035156 14.753906 7.746094 15.226562 7.617188 C 15.363281 7.585938 15.496094 7.566406 15.632812 7.5625 Z M 16.183594 19.75 C 18.566406 19.570312 20.597656 20.886719 20.746094 22.675781 C 20.84375 24.449219 19.007812 26.027344 16.605469 26.1875 C 14.222656 26.351562 12.160156 25.050781 12.046875 23.277344 C 11.933594 21.492188 13.78125 19.929688 16.183594 19.75 Z M 16.183594 19.75 " fillOpacity="1" fillRule="nonzero" />
      </g>
    </svg>
  );
}

export function SemanticScholarIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 8.609c-.848.536-1.436.83-2.146 1.245-4.152 2.509-8.15 5.295-11.247 8.981l-1.488 1.817-4.568-7.268c1.021.814 3.564 3.098 4.603 3.599l3.356-2.526c2.336-1.644 8.946-5.226 11.49-5.848ZM8.046 15.201c.346.277.692.537.969.744.761-3.668.121-7.613-1.886-11.039 3.374-.052 6.731-.087 10.105-.139a14.794 14.794 0 0 1 1.298 5.295c.294-.156.588-.294.883-.433-.104-1.868-.641-3.91-1.662-6.263-4.602-.018-9.188-.018-13.79-.018 2.993 3.547 4.36 7.839 4.083 11.853Zm-.623-.484c.087.086.191.155.277.225-.138-3.409-1.419-6.887-3.824-9.881H1.73c3.098 2.855 4.984 6.299 5.693 9.656Zm-.744-.658c.104.087.208.173.329.277-.9-2.526-2.492-5.018-4.741-7.198H0c2.89 2.076 5.122 4.481 6.679 6.921Z" />
    </svg>
  );
}

export function DBLPIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.17,19.317c-0.161,0-0.318-0.034-0.465-0.102c-0.491-0.228-0.646-0.73-0.672-0.828l-2.232-8.59C2.594,9.007,3.053,8.382,3.566,8.136l1.146-0.549L3.056,1.23C2.888,0.604,3.213,0.282,3.36,0.172c0.341-0.251,0.81-0.227,1.29,0.072l6.338,4.006c0.843,0.523,1.067,1.293,1.09,1.379c0.011,0.039,0.018,0.079,0.021,0.12l2.221,8.508c0.007,0.024,0.021,0.104,0.024,0.129c0.128,0.727-0.325,1.308-0.802,1.534l-6.805,3.261C6.55,19.272,6.357,19.317,6.17,19.317z M4.264,9.465l2.136,8.216l6.497-3.114L10.628,6.05c-0.006-0.024-0.011-0.048-0.015-0.072c-0.039-0.083-0.156-0.292-0.421-0.456l-5.35-3.381L6.32,7.808c0.091,0.347-0.078,0.71-0.401,0.866L4.264,9.465z M4.214,9.489C4.214,9.489,4.214,9.489,4.214,9.489L4.214,9.489L4.214,9.489z" />
      <path d="M20.102,24c-0.235,0-0.493-0.081-0.753-0.24l-6.339-4.006c-0.459-0.286-0.806-0.688-1.026-1.193c-0.009-0.02-0.048-0.131-0.055-0.152l-0.114-0.429c-0.104-0.401,0.135-0.811,0.535-0.916c0.397-0.102,0.811,0.134,0.916,0.535l0.1,0.38c0.028,0.062,0.139,0.315,0.442,0.504l5.352,3.382l-1.475-5.656c-0.091-0.35,0.079-0.714,0.406-0.868l1.7-0.8l-2.189-8.196l-3.479,1.661c-0.377,0.18-0.822,0.02-1-0.354c-0.179-0.374-0.021-0.821,0.354-1l3.79-1.81c0.354-0.167,0.723-0.177,1.036-0.029c0.489,0.23,0.639,0.732,0.664,0.83l2.229,8.587c0.214,0.78-0.241,1.41-0.755,1.662l-1.147,0.54l1.652,6.337c0.163,0.626-0.161,0.948-0.308,1.057C20.482,23.942,20.3,24,20.102,24z M17.515,6.019c0,0.001,0,0.002,0.001,0.003L17.515,6.019z" />
    </svg>
  );
}

export function ACLIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 68 68" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M 41.977553,-2.8421709e-014 C 41.977553,1.76178 41.977553,1.44211 41.977553,3.0158 L 7.4869054,3.0158 L 0,3.0158 L 0,10.50079 L 0,38.47867 L 0,46 L 7.4869054,46 L 49.500802,46 L 56.987708,46 L 68,46 L 68,30.99368 L 56.987708,30.99368 L 56.987708,10.50079 L 56.987708,3.0158 C 56.987708,1.44211 56.987708,1.76178 56.987708,-2.8421709e-014 L 41.977553,-2.8421709e-014 z M 15.010155,17.98578 L 41.977553,17.98578 L 41.977553,30.99368 L 15.010155,30.99368 L 15.010155,17.98578 z" transform="translate(0, 11)" />
    </svg>
  );
}

export function OpenReviewIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
