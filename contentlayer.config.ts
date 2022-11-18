import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

const Author = defineDocumentType(() => ({
    name: 'Author',
    filePathPattern: 'authors/*.mdx',
    bodyType: 'mdx',
    contentType: 'mdx',
    fields: {
        name: {
            type: 'string',
            required: true,
        },
        designation: {
            type: 'string',
            required: true,
        },
        bio: {
            type: 'string',
            required: true,
        },
        avatar: {
            type: 'string',
            required: true,
        },
    },
}))

export const Article = defineDocumentType(() => ({
    name: 'Article',
    filePathPattern: 'articles/*.mdx',
    bodyType: 'mdx',
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        publishedAt: {
            type: 'string',
            required: true,
        },
        description: { 
            type: 'string', 
            required: true 
        },
        seoDescription: {
            type: 'string',
            required: true,
        },
        categories: {
            type: 'list',
            of: {
                type: 'string',
            },
            required: true,
        },
        tags: {
            type: 'list',
            of: {
                type: 'string',
            },
            required: true,
        },
        author: {
            type: 'reference',
            of: Author,
        },
        covers: {
            type: 'list',
            of: {
                type: 'string',
            },
            required: true,
        },
    },
    computedFields: {
        readingTime: {
            type: 'json',
            resolve: (doc) => readingTime(doc.body.raw)
        },
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Article, Author],
    mdx: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})
