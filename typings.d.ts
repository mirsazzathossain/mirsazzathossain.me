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

declare type Project = {
  title: string;
  description: string;
  type?: string;
  link: {
    href: string;
    label: string;
  };
  logo: {
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
