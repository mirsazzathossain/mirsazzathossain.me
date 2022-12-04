import { BibtexParser } from "bibtex-js-parser";
import { promises as fs } from "fs";
import About from "./About";
import Educations from "./Educations";
import Experiences from "./Experiences";
import Publications from "./Publications";

const educations = [
  {
    school: "Independent University, Bangladesh",
    schoolURL: "https://iub.edu.bd/",
    schoolLogo: "/images/iub.png",
    schoolLocation:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    degree: "Bachelor of Science - BS",
    major: "Computer Science and Engineering",
    minor: "Engineering Mathematics",
    date: "2017 - 2021",
    description:
      "Independent University, Bangladesh (IUB) is one of Bangladesh's top-ranked private universities. I have completed my Bachelor of Science (B.Sc.) in Computer Science and Engineering (CSE) from IUB. I studied Engineering Mathematics as a minor while majoring in Computer Science and Engineering.",
    activitiesandsocieties: [
      "Competitive Programming",
      "JUKTI - Club of CSE IUB",
      "IUB ACM Student Chapter",
      "IEEE Computer Society IUB Student Branch Chapter",
    ],
  },
];

const experiences = [
  {
    title: "Research Assistant",
    company: "Center for Computational & Data Sciences",
    companyURL: "http://ccds.ai/",
    companyLogo: "/images/ccds.png",
    location:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    type: "Full-time",
    date: "Feb 2022 - Present",
    description:
      "I am currently employed as a Research Assistant at IUB's Center for Computational and Data Sciences (CCDS). My main role is to conduct research on computer vision, group theory, manifold learning, and geometric machine learning.",
    skills: [
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "Artificial Neural Networks",
      "Data Science",
      "Image Processing",
      "Computer Vision",
      "Deep Learning",
    ],
  },

  {
    title: "Teaching Assistant",
    company: "Independent University, Bangladesh",
    companyURL: "https://iub.edu.bd/",
    companyLogo: "/images/iub.png",
    location:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    type: "Part-time",
    date: "Sep 2021 - Jan 2022",
    description:
      "I have worked as a Teaching Assistant at IUB's Department of Computer Science and Engineering (CSE). My main role was to assist the course instructor in teaching the undergraduate course on Numerical Methods.",
    skills: [
      "Numerical Methods",
      "Numpy",
      "Teaching",
      "Management",
      "Leadership",
    ],
  },

  {
    title: "Undergraduate Research Assistant",
    company: "Independent University, Bangladesh",
    companyURL: "https://iub.edu.bd/",
    companyLogo: "/images/iub.png",
    location:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    type: "Part-time",
    date: "Jan 2021 - Present",
    description:
      "I have worked as an Undergraduate Research Assistant at IUB's Department of Computer Science and Engineering (CSE). My main role was to assist the course instructor in teaching the undergraduate course on Numerical Methods.",
    skills: ["Numerical Methods", "Numpy", "Teaching", "Management"],
  },
];

const photos = [
  "/images/photos/image-1.jpg",
  "/images/photos/image-2.jpg",
  "/images/photos/image-3.jpg",
  "/images/photos/image-4.jpg",
  "/images/photos/image-5.jpg",
];

async function getPublications() {
  const bibtex = await fs.readFile("content/publications.bib", "utf-8");
  const publications = BibtexParser.parseToJSON(bibtex);

  return publications;
}

export default async function Home(): Promise<JSX.Element> {
  const publications = await getPublications();
  return (
    <>
      <About />
      {/* <Photos images={photos} /> */}
      {educations.length > 0 && <Educations educations={educations} />}
      {experiences.length > 0 && <Experiences experiences={experiences} />}
      {publications.length > 0 && <Publications publications={publications} />}
    </>
  );
}
