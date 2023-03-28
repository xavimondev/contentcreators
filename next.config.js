/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['unavatar.io', 'avatars.githubusercontent.com', 'static-cdn.jtvnw.net', 'pbs.twimg.com']
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  }
}

module.exports = nextConfig
