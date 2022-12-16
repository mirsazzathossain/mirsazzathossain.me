"use client";
import ArticleCard from "components/ArticleCard";
import { Container } from "components/Container";
import { ChevronDownIcon } from "components/Icons";
import Link from "next/link";

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

export default function Articles(): JSX.Element {
  return (
    <>
      {articles.length > 0 && (
        <Container className="mt-9">
          <div className="max-w-3xl">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
              Articles
            </h3>

            <div className="flex max-w-3xl flex-col space-y-16">
              {articles.slice(0, 4).map((article: any) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {articles.length > 4 && (
              <div className="flex justify-center mt-10">
                <Link
                  href="/articles"
                  className="group flex items-center text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-500"
                >
                  Show more
                  <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
                </Link>
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
