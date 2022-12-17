import { SVGProps } from "react";

export function ChevronDownIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronUpIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 4.25 4 1.75l2.25 2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  );
}

export function MoonIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadFileIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 8V6h2v4h3l-4 4-4-4h3zm6 7H7v-2h10v2z"></path>
    </svg>
  );
}

export function ReloadIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

export function InfoIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

export function ImageIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 640 512"
      {...props}
    >
      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
    </svg>
  );
}

export function MagnifyingGlassIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export function NotFoundIcon(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <g>
        <path d="m502.43 425.07c-2.2656-2.2188-5.0859-3.7812-8.168-4.5195-3.082-0.74219-6.3086-0.62891-9.332 0.32031l-33.25-33.426c34.688-39.039 46.422-93.379 30.934-143.25-15.488-49.871-55.941-88.008-106.64-100.53-50.699-12.52-104.25 2.3945-141.18 39.324-36.926 36.926-51.84 90.48-39.32 141.18 12.523 50.699 50.66 91.152 100.53 106.64 49.875 15.488 104.21 3.7539 143.25-30.934l33.426 33.426c-1.5977 5.8945-0.007812 12.195 4.1992 16.625l38.5 38.324c3.2578 3.2344 7.6602 5.0547 12.25 5.0742 4.6523 0.027343 9.1211-1.7969 12.426-5.0742 3.2578-3.2773 5.0898-7.7148 5.0898-12.336 0-4.625-1.832-9.0586-5.0898-12.34zm-253.93-43.574c-24.637-24.605-38.484-57.992-38.5-92.812-0.015625-34.816 13.809-68.215 38.422-92.84 24.617-24.629 58.008-38.465 92.828-38.465s68.211 13.836 92.828 38.465c24.613 24.625 38.438 58.023 38.422 92.84-0.015625 34.82-13.863 68.207-38.5 92.812-24.586 24.621-57.953 38.457-92.75 38.457s-68.164-13.836-92.75-38.457z" />
        <path d="m273.88 286.12c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523l11.375-11.199 11.375 11.199c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523c1.6914-1.5859 2.6523-3.8047 2.6523-6.125s-0.96094-4.5391-2.6523-6.125l-11.199-11.375 11.199-11.375c3.3828-3.3828 3.3828-8.8672 0-12.25s-8.8672-3.3828-12.25 0l-11.375 11.199-11.375-11.199c-3.3828-3.3828-8.8672-3.3828-12.25 0s-3.3828 8.8672 0 12.25l11.199 11.375-11.199 11.375c-1.6914 1.5859-2.6523 3.8047-2.6523 6.125s0.96094 4.5391 2.6523 6.125z" />
        <path d="m361.38 286.12c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523l11.375-11.199 11.375 11.199c1.5859 1.6914 3.8047 2.6523 6.125 2.6523s4.5391-0.96094 6.125-2.6523c1.6914-1.5859 2.6523-3.8047 2.6523-6.125s-0.96094-4.5391-2.6523-6.125l-11.199-11.375 11.199-11.375c3.3828-3.3828 3.3828-8.8672 0-12.25s-8.8672-3.3828-12.25 0l-11.375 11.199-11.375-11.199c-3.3828-3.3828-8.8672-3.3828-12.25 0s-3.3828 8.8672 0 12.25l11.199 11.375-11.199 11.375c-1.6914 1.5859-2.6523 3.8047-2.6523 6.125s0.96094 4.5391 2.6523 6.125z" />
        <path d="m411.25 315h-140c-4.832 0-8.75 3.918-8.75 8.75s3.918 8.75 8.75 8.75h26.25v26.25c0 9.3789 5.0039 18.043 13.125 22.734 8.1211 4.6875 18.129 4.6875 26.25 0 8.1211-4.6914 13.125-13.355 13.125-22.734v-26.25h61.25c4.832 0 8.75-3.918 8.75-8.75s-3.918-8.75-8.75-8.75zm-78.75 43.75c0 4.832-3.918 8.75-8.75 8.75s-8.75-3.918-8.75-8.75v-26.25h17.5z" />
        <path d="m516.25 87.5c-11.602 0-22.73 4.6094-30.938 12.812-8.2031 8.207-12.812 19.336-12.812 30.938s4.6094 22.73 12.812 30.938c8.207 8.2031 19.336 12.812 30.938 12.812s22.73-4.6094 30.938-12.812c8.2031-8.207 12.812-19.336 12.812-30.938s-4.6094-22.73-12.812-30.938c-8.207-8.2031-19.336-12.812-30.938-12.812zm0 70c-6.9609 0-13.641-2.7656-18.562-7.6875s-7.6875-11.602-7.6875-18.562 2.7656-13.641 7.6875-18.562 11.602-7.6875 18.562-7.6875 13.641 2.7656 18.562 7.6875 7.6875 11.602 7.6875 18.562-2.7656 13.641-7.6875 18.562-11.602 7.6875-18.562 7.6875z" />
        <path d="m227.5 105c0-9.2812-3.6875-18.184-10.25-24.75-6.5664-6.5625-15.469-10.25-24.75-10.25s-18.184 3.6875-24.75 10.25c-6.5625 6.5664-10.25 15.469-10.25 24.75s3.6875 18.184 10.25 24.75c6.5664 6.5625 15.469 10.25 24.75 10.25s18.184-3.6875 24.75-10.25c6.5625-6.5664 10.25-15.469 10.25-24.75zm-52.5 0c0-4.6406 1.8438-9.0938 5.125-12.375s7.7344-5.125 12.375-5.125 9.0938 1.8438 12.375 5.125 5.125 7.7344 5.125 12.375-1.8438 9.0938-5.125 12.375-7.7344 5.125-12.375 5.125-9.0938-1.8438-12.375-5.125-5.125-7.7344-5.125-12.375z" />
        <path d="m218.75 455h-8.75v-8.75c0-4.832-3.918-8.75-8.75-8.75s-8.75 3.918-8.75 8.75v8.75h-8.75c-4.832 0-8.75 3.918-8.75 8.75s3.918 8.75 8.75 8.75h8.75v8.75c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-8.75h8.75c4.832 0 8.75-3.918 8.75-8.75s-3.918-8.75-8.75-8.75z" />
      </g>
    </svg>
  );
}
