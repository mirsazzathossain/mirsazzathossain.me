import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        newNextLinkBehavior: true,
        scrollRestoration: true,
        images: {
            allowFutureImage: true,
        },
    },
})