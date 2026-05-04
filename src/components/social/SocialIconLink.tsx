import {
  ACMIcon,
  ACLIcon,
  DBLPIcon,
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  OpenReviewIcon,
  OrcidIcon,
  ResearchGateIcon,
  SemanticScholarIcon,
  TwitterXIcon,
} from "@/components/Icons";
import { formatSocialLabel } from "@/utils/social";

const SOCIAL_ICONS = {
  "acm-dl": ACMIcon,
  acl: ACLIcon,
  dblp: DBLPIcon,
  github: GitHubIcon,
  "google-scholar": GoogleScholarIcon,
  linkedin: LinkedInIcon,
  openreview: OpenReviewIcon,
  orcid: OrcidIcon,
  researchgate: ResearchGateIcon,
  "semantic-scholar": SemanticScholarIcon,
  twitter: TwitterXIcon,
};

export function SocialIconLink({
  name,
  url,
}: {
  name: keyof typeof SOCIAL_ICONS | string;
  url: string;
}) {
  const Icon = SOCIAL_ICONS[name as keyof typeof SOCIAL_ICONS];
  if (!Icon) return null;

  const label = formatSocialLabel(name);

  return (
    <a
      href={url}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-ink-3 hover:text-link hover:bg-bg-2 hover:no-underline transition-colors"
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}
