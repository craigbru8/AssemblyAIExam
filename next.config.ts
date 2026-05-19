import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/brain/context*': ['./brain/**/*.brain.md', './content/**/*.md'],
  },
}

export default nextConfig
