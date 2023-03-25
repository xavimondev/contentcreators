import { GradientColor } from 'types'

export const MAX_CHARACTERS_ALLOWED = 150
export const SECONDS_TTL_REDIS = 86400 // 86400 = 24 hours
export const LIST_BACKGROUNDS_GRADIENTS: GradientColor[] = [
  {
    // Orange paradise
    colorFrom: '#FBBA00',
    colorTo: '#FF8714'
  },
  {
    // Fresh cut grass
    colorFrom: '#a5e29c',
    colorTo: '#1b7b2c'
  },
  {
    // Tahiti
    colorFrom: '#62daca',
    colorTo: '#10d4a9'
  },
  {
    // The blue bird
    colorFrom: '#7debf2',
    colorTo: '#60a4ff'
  },
  {
    // Sweet as Pie
    colorFrom: '#cb6594',
    colorTo: '#f81d55'
  },
  {
    // Nostalgia
    colorFrom: '#8e1d9e',
    colorTo: '#b764c5'
  },
  {
    // Custom orange
    colorFrom: '#e27750',
    colorTo: '#e4a981'
  },
  {
    // Pink panther
    colorFrom: '#FFC0D6',
    colorTo: '#e0709f'
  },
  {
    // Aruba
    colorFrom: '#42afa1',
    colorTo: '#78d4a8'
  }
]
export const URL_TWITCH_GENERATE_TOKEN = 'https://id.twitch.tv/oauth2/token'
export const URL_TWITCH_LIST_STREAMS = 'https://api.twitch.tv/helix/streams'
