/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['unavatar.io']
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  }
}

module.exports = nextConfig
