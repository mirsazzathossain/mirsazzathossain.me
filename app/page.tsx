import About from "./About";
import Articles from "./Articles";
import Educations from "./Educations";
import Experiences from "./Experiences";
import LifeEvents from "./LifeEvents";
import Publications from "./Publications";

const photos = [
  "/images/photos/image-1.jpg",
  "/images/photos/image-2.jpg",
  "/images/photos/image-3.jpg",
  "/images/photos/image-4.jpg",
  "/images/photos/image-5.jpg",
];

const articles = [
  {
    title: "A Brief Introduction to Group Theory",
    date: "December 3, 2022",
    description:
      "Group theory is a branch of mathematics that studies groups, which are sets of elements that are closed under some binary operation. In this article, we will be discussing the basics of group theory.",
    slug: "a-brief-introduction-to-group-theory",
  },
  {
    title: "A Brief Introduction to Manifold Learning",
    date: "December 3, 2022",
    description:
      "Manifold learning is a branch of machine learning that studies the manifold structure of data. In this article, we will be discussing the basics of manifold learning.",
    slug: "a-brief-introduction-to-manifold-learning",
  },
  {
    title: "A Brief Introduction to Geometric Machine Learning",
    date: "December 3, 2022",
    description:
      "Geometric machine learning is a branch of machine learning that studies the geometric structure of data. In this article, we will be discussing the basics of geometric machine learning.",
    slug: "a-brief-introduction-to-geometric-machine-learning",
  },
  {
    title: "A Brief Introduction to Artificial Neural Networks",
    date: "December 3, 2022",
    description:
      "Artificial neural networks (ANNs) are a class of machine learning models that are inspired by the structure and function of biological neural networks. In this article, we will be discussing the basics of artificial neural networks.",
    slug: "a-brief-introduction-to-artificial-neural-networks",
  },
  {
    title: "A Brief Introduction to Artificial Intelligence",
    date: "December 3, 2022",
    description:
      "Artificial intelligence (AI) is a branch of computer science that studies how to make computers intelligent. In this article, we will be discussing the basics of artificial intelligence.",
    slug: "a-brief-introduction-to-artificial-intelligence",
  },
  {
    title: "A Brief Introduction to Machine Learning",
    date: "December 3, 2022",
    description:
      "Machine learning is a branch of computer science that studies how to make computers learn. In this article, we will be discussing the basics of machine learning.",
    slug: "a-brief-introduction-to-machine-learning",
  },
];

export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <About />
      {/* <Photos images={photos} /> */}
      <Educations />
      <Experiences />
      <Publications />
      {articles.length > 0 && <Articles articles={articles} />}
      <LifeEvents />
    </>
  );
}
