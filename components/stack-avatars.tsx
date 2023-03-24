import Image from 'next/image'

import CustomLink from 'components/custom-link'
import Tooltip from 'components/tooltip'

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

const StackAvatars = () => {
  return (
    <div className='flex -space-x-4 items-center'>
      <Tooltip text='36 personas están viendo a xavimon'>
        <CustomLink href='https://www.twitch.tv/xavimon' rel='noopener noreferrer' target='_blank'>
          <Avatar urlImage='https://avatars.githubusercontent.com/u/68721455?v=4' alt='xavimon' />
        </CustomLink>
      </Tooltip>
    </div>
  )
}

export default StackAvatars
