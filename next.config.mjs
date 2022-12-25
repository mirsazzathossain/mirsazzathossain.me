import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
    images: {
        domains: ['images.unsplash.com', 'cdn.buymeacoffee.com'],
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        newNextLinkBehavior: true,
        scrollRestoration: true,
        images: {
            allowFutureImage: true,
        },
        appDir: true,
    },
})