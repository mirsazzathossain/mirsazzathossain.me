import { useMDXComponent } from 'next-contentlayer/hooks'
import { Article, allArticles, Author, allAuthors } from 'contentlayer/generated'

type articleProps = {
    article: Article
}

export default function ArticlePage({ article }: articleProps) {
    const MDXComponent = useMDXComponent(article.body.code)
  
    return (
        <div>
            <MDXComponent />
        </div>
    )
}


export async function getStaticPaths() {
    return {
        paths: allArticles.map((article) => ({ params: { slug: article.slug } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }: any) {
    const article = allArticles.find((article) => article.slug === params.slug)
    return { props: { article } }
}