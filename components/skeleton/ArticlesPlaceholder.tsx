import { Container } from "components/Container";
import ArticleCardPlaceholder from "./ArticleCardPlaceholder";

export default function ArticlesPlaceholder() {
  return (
    <Container className="mt-10">
      <div className="max-w-3xl animate-pulse">
        <div className="h-[26px] bg-gray-300 rounded-full dark:bg-gray-600 w-[150px] md:h-[32px] md:w-[200px]" />

        {[...Array(4)].map((_, i) => (
          <ArticleCardPlaceholder key={i} />
        ))}
      </div>
    </Container>
  );
}
