import { PropsWithChildren } from 'react'

const PageHeader = ({ children }: PropsWithChildren) => {
  return (
    <header className='sticky top-0 z-50 text-white font-semibold w-full backdrop-blur-lg'>
      <div className='px-6 py-4'>
        <div className='flex flex-row justify-between items-center'>{children}</div>
      </div>
    </header>
  )
}

export default PageHeader
