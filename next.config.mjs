import { withContentlayer } from 'next-contentlayer'

export default withContentlayer({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
})