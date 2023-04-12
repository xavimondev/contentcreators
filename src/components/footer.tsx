import CustomLink from './custom-link'
import { GitHubIc } from './icons'

const Footer = () => {
  return (
    <footer className='w-full'>
      <div className='py-10'>
        <div className='flex justify-center'>
          <CustomLink
            href='https://github.com/xavimondev/content-creators'
            rel='noopener noreferrer'
            target='_blank'
            aria-label='Go to Repository'
          >
            <GitHubIc className='w-6 h-6 text-white' />
          </CustomLink>
        </div>
      </div>
    </footer>
  )
}

export default Footer
