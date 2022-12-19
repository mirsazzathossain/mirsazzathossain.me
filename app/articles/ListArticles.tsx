export default async function ListArticles({
  searchValue,
  page,
  totalArticles,
  setTotalArticles,
}: {
  searchValue: string;
  page: number;
  totalArticles: number;
  setTotalArticles: (totalArticles: number) => void;
}) {
  return (
    <>
      {/* {currentArticles.map((article: Article, index: number) => (
        <ArticleCard key={index} article={article} />
      ))} */}
    </>
  );
}
