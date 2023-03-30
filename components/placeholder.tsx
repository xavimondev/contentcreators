import { UserIc } from 'components/icons'

const PlaceholderCard = ({ length }: { length: number }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center'>
      {Array.from({ length }, (_, index) => index + 1).map((item) => (
        <PlaceHolderItem key={item} />
      ))}
    </div>
  )
}

const PlaceHolderAvatar = ({ length }: { length: number }) => {
  return (
    <div className='flex -space-x-4 items-center'>
      {Array.from({ length }, (_, index) => index + 1).map((item) => (
        <PlaceHolderItemAvatar key={item} />
      ))}
    </div>
  )
}

const PlaceHolderItem = () => {
  return (
    <div className='px-6 py-8 max-w-sm rounded-2xl border border-gray-100 shadow animate-pulse dark:border-indigo-200 w-full'>
      <div className='flex flex-col gap-6'>
        <svg
          className='w-28 h-28 text-gray-200 dark:text-gray-500'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
            clipRule='evenodd'
          ></path>
        </svg>
        {/* Name block */}
        <div className='flex flex-col gap-2'>
          <div className='h-3 w-full bg-gray-200 rounded-full dark:bg-gray-500 mb-4'></div>
        </div>
        <div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-500'></div>
        </div>
        <div className='flex flex-row gap-4'>
          <div className='h-2.5 w-14 bg-gray-200 rounded-full dark:bg-gray-500 mb-2'></div>
          <div className='h-2 w-14 bg-gray-200 rounded-full dark:bg-gray-500'></div>
        </div>
      </div>
    </div>
  )
}

const PlaceHolderItemAvatar = () => {
  return (
    <div className='animate-pulse'>
      <UserIc className='w-8 h-8 text-gray-700' />
    </div>
  )
}

const PlaceHolderToolbarAuth = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center gap-2'>
        <div className='h-6 w-full bg-gray-500 rounded-full'></div>
        <div className='rounded-full bg-gray-500 w-8 h-6' />
        <div className='rounded-full bg-gray-500 w-8 h-6' />
      </div>
    </div>
  )
}

type PlaceholderProps = {
  length: number
  type: 'card' | 'avatar' | 'toolbar'
}

const Placeholder = ({ length, type }: PlaceholderProps) => {
  if (type === 'card') return <PlaceholderCard length={length} />
  else if (type === 'toolbar') return <PlaceHolderToolbarAuth />
  else return <PlaceHolderAvatar length={length} />
}

export default Placeholder
