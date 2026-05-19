import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: false,
  },
  outputFileTracingIncludes: {
    '/api/brain/context*': ['./brain/**/*.brain.md', './content/**/*.md'],
  },
}

export default nextConfig
