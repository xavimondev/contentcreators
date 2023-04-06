import Image from 'next/image'
import type { StreamerLive } from 'types'
import CustomLink from './custom-link'
import Tooltip from './tooltip'

type AvatarProps = {
  urlImage: string
  alt: string
}

const Avatar = ({ urlImage, alt }: AvatarProps) => {
  return (
    <Image
      className='w-full h-full rounded-full border border-indigo-400 bg-[#292539] transition hover:-translate-y-1'
      src={urlImage}
      alt={alt}
      width={32}
      height={32}
    />
  )
}

const StackAvatars = ({ streamers }: { streamers: StreamerLive[] }) => {
  return (
    <div className='flex -space-x-4 items-center'>
      {streamers.length > 0 &&
        streamers.map((streamer) => {
          const { id, avatarUrl, streamerLogin, streamerName, viewerCount, titleStream } = streamer
          return (
            <Tooltip
              text={`${viewerCount} personas están viendo a ${streamerName} - ${titleStream}`}
              key={id}
            >
              <CustomLink
                href={`https://www.twitch.tv/${streamerLogin}`}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Avatar urlImage={avatarUrl} alt={streamerLogin} />
              </CustomLink>
            </Tooltip>
          )
        })}
    </div>
  )
}

export default StackAvatars
