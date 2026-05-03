const SOCIAL_LABELS: Record<string, string> = {
  "google-scholar": "Google Scholar",
  "semantic-scholar": "Semantic Scholar",
  "dblp": "DBLP",
  "acl": "ACL Anthology",
  "openreview": "OpenReview",
  "github": "GitHub",
  "linkedin": "LinkedIn",
  "twitter": "Twitter",
  "researchgate": "ResearchGate",
  "orcid": "ORCID",
  "acm-dl": "ACM Digital Library",
};

export function formatSocialLabel(name: string): string {
  return SOCIAL_LABELS[name] || name;
}
