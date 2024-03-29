import type { StreamerLive } from 'types'
import StackAvatars from './stack-avatars'

type LiveStreamersProps = {
  streamers: StreamerLive[]
}

const LiveStreamers = ({ streamers }: LiveStreamersProps) => {
  return (
    <div className='hidden sm:block'>
      {streamers.length > 0 && (
        <div className='relative sm:flex items-center gap-2 bg-[#1E1C26] py-1 px-4 rounded-md'>
          <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
          </span>
          <span className='text-red-500 text-sm'>En directo:</span>
          <StackAvatars streamers={streamers} />
        </div>
      )}
    </div>
  )
}

export default LiveStreamers
