import {
  DiscordIcon,
  EmailIcon,
  LinkedInIcon,
  PinIcon,
} from "@/components/Icons";
import { getSocialLink } from "@/utils/about";
import type { About } from "./types";

export function AboutSidebar({
  about,
  email,
}: {
  about: About;
  email: string;
}) {
  const linkedInLink = getSocialLink(about.socialLinks, "linkedin");
  const discordLink = getSocialLink(about.socialLinks, "discord");
  const linkedInUsername = about.socialLinks.find(link => link.name === "linkedin")?.username || "mirsazzathossain";
  const discordUsername = about.socialLinks.find(link => link.name === "discord")?.username || "mirsazzathossain";

  return (
    <aside>
      <img
        className="w-full max-w-[220px] rounded-[10px] object-cover aspect-square"
        src={about.photo || "/images/profile.png"}
        alt={about.name}
      />
      <div className="grid gap-[6px] mt-[14px] text-[12.5px] text-ink-2">
        <a
          href={about.location?.url || "https://www.google.com/maps?q=23.8103,90.4125"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-[6px] hover:text-link transition-colors"
        >
          <PinIcon className="h-[13px] w-[13px]" /> {about.location?.name || "Dhaka, Bangladesh"}
        </a>
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-[6px] hover:text-link transition-colors"
        >
          <EmailIcon className="h-[13px] w-[13px]" /> {email}
        </a>
        <a
          href={linkedInLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-[6px] hover:text-link transition-colors"
        >
          <LinkedInIcon className="w-[13px] h-[13px]" /> {linkedInUsername}
        </a>
        <a
          href={discordLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-[6px] hover:text-link transition-colors"
        >
          <DiscordIcon className="w-[13px] h-[13px]" /> {discordUsername}
        </a>
      </div>
    </aside>
  );
}
