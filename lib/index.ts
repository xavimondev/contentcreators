export const authRedirectTo =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://contentcreators.vercel.app'
