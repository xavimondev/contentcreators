import { ReactNode } from 'react'

export type Creator = {
  id: string
  profileUrl: string // URL social media
  name: string
  description: string
  categories: Category[]
  social: Social[]
  twitchId?: string // you can get from url
  username: string
}

export type Social = {
  id: SocialMedia
  url: string
}

export type SocialLink = {
  id: SocialMedia
  Component: ReactNode
}

export type SocialMedia =
  | 'twitter'
  | 'github'
  | 'twitch'
  | 'youtube'
  | 'discord'
  | 'instagram'
  | 'blog'

export type Category =
  | 'frontend'
  | 'backend'
  | 'cloud'
  | 'mobile'
  | 'database'
  | 'datascience'
  | 'uiux'
  | 'ciberseguridad'

export type StreamerLive = {
  id: string
  titleStream: string
  streamerName: string
  streamerLogin: string
  viewerCount: number
  avatarUrl: string
}
