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
  ScopusIcon,
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
  scopus: ScopusIcon,
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
      className="text-ink-3 hover:text-link hover:bg-bg-2 inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:no-underline"
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
