import Image from 'next/image'

import { Comment } from 'types'

import CustomLink from './custom-link'

type CommentProps = {
  commentInfo: Comment
}

const CommentCard = ({ commentInfo }: CommentProps) => {
  const { message, author, authorAvatar, authorUsername } = commentInfo
  return (
    <CustomLink
      href={`https://github.com/${authorUsername}`}
      target='_blank'
      rel='noopener noreferrer'
      classes='bg-[#1E1C26] rounded-xl w-full sm:max-w-[350px] sm:w-[320px] shadow-md flex flex-col gap-3 p-5'
    >
      <h3 className='text-sm text-gray-500 font-semibold'>Marzo 15, 2023</h3>
      <blockquote>
        <p className='text-white text-base sm:text-lg'>{message}</p>
      </blockquote>
      <div className='mt-3 flex flex-row items-center gap-3'>
        <div className='rounded-full w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-[#d5578f] p-0.5'>
          <div className='relative w-full h-full bg-[#1E1C26] rounded-full'>
            <Image src={authorAvatar} className='rounded-full' alt={author} fill />
          </div>
        </div>
        <div className='space-y-0.5'>
          <span className='font-semibold text-white/80'>{author}</span>
          <div className='text-sm font-light text-gray-400'>{authorUsername}</div>
        </div>
      </div>
    </CustomLink>
  )
}

export default CommentCard
