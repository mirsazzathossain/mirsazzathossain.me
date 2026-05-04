export type About = {
  name: string;
  designation: string;
  company: { name: string; url: string };
  description: string;
  location?: { name: string; url: string };
  email?: string;
  photo?: string;
  socialLinks: { name: string; url: string; username?: string }[];
  resume: string;
};

export type Education = {
  school: string;
  schoolURL: string;
  degree: string;
  major: string;
  minor?: string;
  date: string;
  description: string;
};

export type Experience = {
  title: string;
  company: string;
  companyURL: string;
  type: string;
  date: string;
  category: "research" | "industry" | "teaching";
  description: string;
  skills?: string[];
};

export type Award = {
  title: string;
  time: string;
  icon: string;
  credentialUrl?: string;
  credentialLabel?: string;
};

export type Talk = {
  title: string;
  venue: string;
  location: string;
  date: string;
  type: "oral" | "poster" | "workshop";
  slidesUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
};

export type Service = {
  venue: string;
  year: number;
  role: string;
};

export type Press = {
  title: string;
  outlet: {
    name: string;
    logo?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  date: string;
  url: string;
  image?: string;
  desc: string;
};

export type Availability = {
  tz: string;
  rangeLabel: string;
  days: string[];
  dates: string[];
  hours: string[];
  grid: string[];
};

export type TimelineYear = {
  year: number;
  items: { kind: string; text: string }[];
};

export type AboutPageProps = {
  about: About;
  educations: Education[];
  experiences: Experience[];
  awards: Award[];
  talks: Talk[];
  service: Service[];
  press: Press[];
  availability: Availability;
  timeline: TimelineYear[];
};
