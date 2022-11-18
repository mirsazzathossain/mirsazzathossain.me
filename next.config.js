/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'media-exp1.licdn.com', 'images.pexels.com'],
    dangerouslyAllowSVG: true,
  },
})
