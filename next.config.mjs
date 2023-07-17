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
        appDir: true,
        mdxRs: false,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
})