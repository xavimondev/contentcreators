import { ReactNode } from 'react'

export type Creator = {
  id: string
  name: string
  description: string
  categories: Category[]
  social: Social[]
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

export type Category = 'frontend' | 'backend' | 'cloud' | 'mobile' | 'database'
