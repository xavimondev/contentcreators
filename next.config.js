/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['jugfuygudbzdsogjcbwa.supabase.co', 'avatars.githubusercontent.com']
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  }
}

module.exports = nextConfig
