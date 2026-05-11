// Restore global JSX namespace removed in React 19
declare namespace JSX {
  type Element = import('react').JSX.Element;
  interface ElementClass extends import('react').Component<any> {}
  interface IntrinsicElements extends import('react').JSX.IntrinsicElements {}
  type ElementAttributesProperty = import('react').JSX.ElementAttributesProperty;
  type ElementChildrenAttribute = import('react').JSX.ElementChildrenAttribute;
  type LibraryManagedAttributes<C, P> = import('react').JSX.LibraryManagedAttributes<C, P>;
}

// declare type for experience
declare type Experience = {
  title: string;
  company: string;
  companyURL: string;
  companyLogo: string;
  location: string;
  type: string;
  date: string;
  description: string;
  skills: string[];
};

declare type Education = {
  school: string;
  schoolURL: string;
  schoolLogo: string;
  schoolLocation: string;
  degree: string;
  major: string;
  minor: string;
  date: string;
  description: string;
  activitiesandsocieties: string[];
};

declare type Resource = {
  title: string;
  url: string;
  description: string;
  category: string;
};

declare type ResourcePageData = {
  title: string;
  description: string;
  canonicalPath: string;
  eyebrow: string;
  heading: string;
  intro: string;
  searchPlaceholder: string;
  searchLabel: string;
  emptyText: string;
};

declare type Project = {
  title: string;
  description: string;
  type?: string;
  glyph?: string;
  stars?: number;
  tags?: string[];
  language?: string;
  link: {
    href: string;
    label: string;
  };
  logo?: {
    src: string;
    alt: string;
  };
};

declare type CourseNotebook = {
  n: string;
  title: string;
};

declare type CourseResource = {
  title: string;
  href: string;
};

declare type CourseScheduleItem = {
  week: string;
  topic: string;
};

declare type Course = {
  code: string;
  slug: string;
  title: string;
  role: string;
  term: string;
  inst: string;
  lang: string;
  description: string;
  students?: number;
  repo?: string;
  link: {
    href: string;
    label: string;
  };
  logo: {
    src: string;
    alt: string;
  };
  publishedDate: string;
  totalDuration: string;
  syllabus?: string;
  outcome?: string;
  schedule?: CourseScheduleItem[];
  notebooks?: CourseNotebook[];
  resources?: CourseResource[];
};

declare type Color = {
  id: string;
  foreground: string;
  background: string;
};

declare type CalEvent = {
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  color: Color;
  link: string;
};

declare type Day = {
  date: string;
  events: CalEvent[];
};
