import Image from 'next/image'

import { Comment } from 'types'

import CustomLink from './custom-link'

type CommentProps = {
  commentInfo: Comment
  className?: string
}

const CommentCard = ({ commentInfo, className }: CommentProps) => {
  const { message, author, authorAvatar, authorUsername } = commentInfo
  return (
    <div
      className={`flex flex-col gap-3 p-4 bg-white rounded-xl w-full sm:max-w-xs shadow-[-6px_-6px_0_0px_rgb(29,78,216)] ${className}`}
    >
      <CustomLink href={`https://github.com/${authorUsername}`} target='_blank'>
        <div className='flex flex-row items-center gap-3'>
          <div className='relative w-8 h-8'>
            <Image src={authorAvatar} className='rounded-full' alt={author} layout='fill' />
          </div>
          <div className='space-y-0.5'>
            <span className='font-medium'>{author}</span>
            <div className='text-sm font-light text-gray-400'>{authorUsername}</div>
          </div>
        </div>
      </CustomLink>
      <blockquote>
        <p className='text-gray-500'>{message}</p>
      </blockquote>
    </div>
  )
}

export default CommentCard
