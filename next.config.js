const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/kuwa-swap' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  env: {
    basePath,
  },
}

module.exports = nextConfig
