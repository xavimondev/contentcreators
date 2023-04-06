/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['jugfuygudbzdsogjcbwa.supabase.co', 'avatars.githubusercontent.com']
  }
}

module.exports = nextConfig
