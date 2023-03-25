import { ReactNode } from 'react'

export type Creator = {
  id: string
  profileUrl: string // URL social media
  name: string
  description: string
  categories: Category[]
  social: Social[]
  twitchId?: string // you can get from url
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

export type Comment = {
  id: number
  message: string
  author: string
  authorAvatar: string
  authorUsername: string
  createdAt?: string
}

export type User = {
  userId: string
  fullName: string
  username: string
  avatarUrl: string
}

export type GradientColor = {
  colorFrom: string
  colorTo: string
}

export type CreatorStory = {
  dedicatedTo: string // content creator username
  author: string
  message: string
  date: number //milliseconds
}

export type StreamerLive = {
  id: string
  titleStream: string
  streamerName: string
  streamerLogin: string
  viewerCount: number
  avatarUrl: string
}
