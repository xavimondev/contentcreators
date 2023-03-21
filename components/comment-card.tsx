import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { getRelativeTime } from 'utils/getRelativeTime'

import { MAX_CHARACTERS_ALLOWED } from 'global/constants'

import { Comment } from 'types'

import { PencilIc, SaveIc, TrashIc, CancelIc } from './icons'

type CommentProps = {
  commentInfo: Comment
  handleDelete: (commentId: number) => void
  updateComment: (commentId: number, commentValue: string) => void
}

const CommentCard = ({ commentInfo, handleDelete, updateComment }: CommentProps) => {
  const [commentEditingId, setCommentEditingId] = useState<number | undefined>(undefined)
  const [commentEditingValue, setCommentEditingValue] = useState<string>(commentInfo.message)
  const { id, author, authorAvatar, authorUsername, createdAt } = commentInfo
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef) {
      const lengthComment = commentEditingValue.length
      inputRef.current?.setSelectionRange(lengthComment, lengthComment)
      inputRef.current?.focus()
    }
  }, [commentEditingId])

  return (
    <div className='bg-[#1E1C26] rounded-xl sm:h-[280px] p-5 h-full flex flex-col gap-3'>
      <div className='flex justify-between items-center'>
        <h3 className='text-sm text-gray-500 font-semibold'>
          {getRelativeTime(new Date(createdAt!))}
        </h3>
        <div className='space-x-4'>
          <button onClick={() => handleDelete(id)}>
            <TrashIc className='text-red-300 h-4 w-4' />
          </button>
          {commentEditingId === commentInfo.id ? (
            <>
              <button
                onClick={() => {
                  updateComment(commentEditingId, commentEditingValue)
                  setCommentEditingId(undefined)
                }}
              >
                <SaveIc className='text-red-300 h-4 w-4' />
              </button>
              <button onClick={() => setCommentEditingId(undefined)}>
                <CancelIc className='text-red-300 h-4 w-4' />
              </button>
            </>
          ) : (
            <button onClick={() => setCommentEditingId(id)}>
              <PencilIc className='text-red-300 h-4 w-4' />
            </button>
          )}
        </div>
      </div>
      {commentEditingId === commentInfo.id ? (
        <textarea
          ref={inputRef}
          value={commentEditingValue}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            if (e.currentTarget.value.length <= MAX_CHARACTERS_ALLOWED) {
              setCommentEditingValue(e.currentTarget.value)
            }
          }}
          className='bg-transparent border-none outline-none resize-none text-white h-full'
        ></textarea>
      ) : (
        <p className='text-white text-base'>{commentEditingValue}</p>
      )}
      <div className='mt-auto flex flex-row items-center gap-3'>
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
    </div>
  )
}

export default CommentCard
