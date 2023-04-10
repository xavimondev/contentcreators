import type { SocialLink, SocialMedia } from 'types'
import CustomLink from './custom-link'
import { BlogIc, DiscordIc, GitHubIc, InstagramIc, TwitchIc, TwitterIc, YoutubeIc } from './icons'

export const SOCIAL_LINKS: Array<SocialLink> = [
  {
    id: 'twitter',
    Component: <TwitterIc className='w-6 h-6' color='white' />
  },
  {
    id: 'github',
    Component: <GitHubIc className='w-6 h-6' color='white' />
  },
  {
    id: 'twitch',
    Component: <TwitchIc className='w-6 h-6' color='white' />
  },
  {
    id: 'youtube',
    Component: <YoutubeIc className='w-6 h-6' color='white' />
  },
  {
    id: 'discord',
    Component: <DiscordIc className='w-6 h-6' color='white' />
  },
  {
    id: 'instagram',
    Component: <InstagramIc className='w-6 h-6' color='white' />
  },
  {
    id: 'blog',
    Component: <BlogIc className='w-6 h-6' color='white' />
  }
]

type SocialLinkProps = {
  id: SocialMedia
  url: string
}

const SocialResourceLink = ({ url, id }: SocialLinkProps) => {
  const data = SOCIAL_LINKS.find((social) => social.id === id)

  if (!data) return null

  const Component = data.Component
  return (
    <li className='transition hover:scale-110'>
      <CustomLink href={url} rel='noopener noreferrer' target='_blank'>
        {Component}
      </CustomLink>
    </li>
  )
}

export default SocialResourceLink
