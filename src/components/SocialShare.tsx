"use client";

import type { ArticleEntry } from "@/utils/articles";

function RoundShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex rounded-full transition opacity-90 hover:opacity-100"
    >
      {children}
    </a>
  );
}

const iconWrap = "block h-8 w-8 shrink-0 rounded-full";

export default function SocialShare({
  article,
  siteUrl,
}: {
  article: ArticleEntry;
  siteUrl: string;
}): JSX.Element {
  const url = `${siteUrl}/articles/${article.id}`;
  const title = article.data.title;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const hashtags =
    article.data.tags?.map((t) => t.title.replace(/^#/, "")).join(",") ?? "";

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtags ? `&hashtags=${encodeURIComponent(hashtags)}` : ""}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  return (
    <div className="flex justify-center space-x-2">
      <RoundShareLink href={links.facebook} label="Share on Facebook">
        <svg className={iconWrap} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="16" fill="#1877F2" />
          <path
            fill="#fff"
            d="M21.5 16.5h-3v8h-3.3v-8H13V14h2.2v-1.9c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2.5h-1c-1 0-1.3.6-1.3 1.2V14h2.3l-.4 2.5z"
          />
        </svg>
      </RoundShareLink>
      <RoundShareLink href={links.twitter} label="Share on X">
        <svg className={iconWrap} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="16" fill="#000" />
          <path
            fill="#fff"
            d="M18.2 14.5 24 8h-1.8l-4.9 5.6L14 8H8l6.4 9.2L8 24h1.8l5.2-5.9 4.1 5.9H24l-5.8-8.5zm-1.9 2.2-.65-.92L10.4 9.3h2.2l4.2 5.9.65.92 5.4 7.6h-2.2l-4.4-6.2z"
          />
        </svg>
      </RoundShareLink>
      <RoundShareLink href={links.reddit} label="Share on Reddit">
        <svg className={iconWrap} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="16" fill="#FF4500" />
          <path
            fill="#fff"
            d="M21.3 16.1c0-1-.8-1.8-1.8-1.8-.5 0-1 .2-1.3.6-1.3-.9-3-1.5-4.9-1.6l1-2.3 2.4.6.3-1.1-3.4-.8-.8 1.9c-2.5.1-4.8.8-6.3 1.9-.4-.3-.8-.5-1.3-.5-1 0-1.8.8-1.8 1.8 0 .7.4 1.3.9 1.6-.1.3-.1.5-.1.8 0 3.4 3.9 6.2 8.7 6.2s8.7-2.8 8.7-6.2c0-.3 0-.5-.1-.8.5-.3.9-.9.9-1.6zm-11.2-.6c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zm5.8 4c-1.5 1-4.3 1-5.8 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1 0.7 3.2 0.7 4.3 0 .2-.2.5-.2.7 0 .2.2.2.5 0 .7zm-.3-2.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"
          />
        </svg>
      </RoundShareLink>
      <RoundShareLink href={links.linkedin} label="Share on LinkedIn">
        <svg className={iconWrap} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="16" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M12.1 13.1H9v9.3h3.1V13.1zm-1.5-4.7c-1 0-1.7.8-1.7 1.7 0 .9.8 1.6 1.7 1.6h.1c1 0 1.7-.7 1.7-1.6 0-.9-.8-1.7-1.8-1.7zm11.2 4.9c-1.6 0-2.8.9-3.3 1.8h-.1v-1.5H16v9.3h3.1v-5.2c0-1.3.2-2.6 1.9-2.6 1.6 0 1.6 1.5 1.6 2.7v5.1H23v-5.7c0-2.7-.6-4.6-3.8-4.6z"
          />
        </svg>
      </RoundShareLink>
      <RoundShareLink href={links.whatsapp} label="Share on WhatsApp">
        <svg className={iconWrap} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path
            fill="#fff"
            d="M16.3 8c-4.2 0-7.6 3.4-7.6 7.6 0 1.3.4 2.6 1 3.7L8 24l4.9-1.3c1.1.6 2.3.9 3.6.9h0c4.2 0 7.6-3.4 7.6-7.6S20.5 8 16.3 8zm4.4 10.8c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.5-.1-.3-.1-.7-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.1-.9-1.2-.9-2.3 0-1.1.5-1.7.7-1.9.2-.2.5-.3.7-.3h.6c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .5-.1.2-.2.3-.4.5l-.6.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.2.8-.1.2-.3.9-1.1 1.1-1.4.2-.4.2-.7.1-.8-.1-.1-.3-.2-.6-.4-.3-.2-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.4.4-.6.6-.1.1-.3.2-.5.1-.2-.1-1.1-.4-2-1.3-.7-.7-1.2-1.6-1.4-1.8-.2-.2 0-.4.1-.5.2-.2.4-.4.6-.7.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.5-1.4-.7-1.9z"
          />
        </svg>
      </RoundShareLink>
    </div>
  );
}
