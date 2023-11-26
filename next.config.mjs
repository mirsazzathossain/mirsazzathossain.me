import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
    images: {
        domains: ['images.unsplash.com', 'cdn.buymeacoffee.com', 'github.com'],
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        scrollRestoration: true,
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