"use client";

import { useState } from "react";
import { TwitterIcon, LinkedInIcon, FacebookIcon, WhatsAppIcon, LinkIcon } from "@/components/ui/Icon";

export default function ArticleShareRow({ title, url }: { title: string; url: string }): JSX.Element {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const btnCls = "inline-flex items-center gap-1 rounded border border-rule bg-bg px-2.5 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link hover:no-underline";

  const shareLinks = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <TwitterIcon width={11} height={11} />,
      label: "Twitter",
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon width={12} height={12} />,
      label: "LinkedIn",
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon width={11} height={11} />,
      label: "Facebook",
    },
    {
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon width={12} height={12} />,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-rule pt-4">
      <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-3">Share</span>

      {shareLinks.map(({ href, icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" className={btnCls}>
          {icon} {label}
        </a>
      ))}

      <button type="button" onClick={copyLink} className={btnCls}>
        <LinkIcon width={11} height={11} /> {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
