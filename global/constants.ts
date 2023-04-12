export const URL_TWITCH_GENERATE_TOKEN = 'https://id.twitch.tv/oauth2/token'
export const URL_TWITCH_LIST_STREAMS = 'https://api.twitch.tv/helix/streams'
export const AUTH_REDIRECT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://contentcreators.vercel.app'
