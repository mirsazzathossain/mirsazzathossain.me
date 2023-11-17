import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
    images: {
        domains: ['images.unsplash.com', 'cdn.buymeacoffee.com'],
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
    headers: {
        'Access-Control-Allow-Origin': ['https://www.mirsazzathossain.me', 'https://mirsazzathossain.me'],
    }
})