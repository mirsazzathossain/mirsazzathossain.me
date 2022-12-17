import SimpleLayout from "components/SimpleLayout";
import { server } from "config";
import SearchArticles from "./SearchArticles";

export default async function Articles({
  params,
  searchParams,
}: {
  params?: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const articles = await fetch(`${server}/api/articles`).then((res) =>
    res.json()
  );
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;

  return (
    <SimpleLayout
      title="Writing on Machine Learning, Advance Math, and Programming"
      intro="All my articles are written with the goal of helping you learn something new. I hope you enjoy them!"
    >
      <SearchArticles articles={articles} page={page} />
    </SimpleLayout>
  );
}
