import React, { RefObject, useRef, useState, useEffect } from 'react'
import { SendIc } from './icons'

type DialogCommentProps = {
  dialogRef: RefObject<HTMLDivElement>
  onSave: (content: string) => void
}

const DialogComment = ({ dialogRef, onSave }: DialogCommentProps) => {
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    if (commentRef.current) {
      commentRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (commentRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      commentRef.current.style.height = '0px'
      const scrollHeight = commentRef.current.scrollHeight
      commentRef.current.style.height = scrollHeight + 'px'
    }
  }, [commentRef, comment])

  const handleSubmit = () => {
    onSave(comment)
    setComment('')
    commentRef.current?.focus()
  }

  return (
    <div
      ref={dialogRef}
      id='commentDialog'
      className='fixed rounded-lg p-3 left-0 right-0 bottom-20 sm:bottom-[92px] sm:right-[195px] sm:left-auto w-3/4 m-auto sm:w-auto bg-[#1E1C26]  
      sm:before:content-[" "] 
      sm:before:absolute 
      sm:before:w-0 
      sm:before:h-0 
      sm:before:left-auto 
      sm:before:right-3
      sm:before:bottom-[-22px] 
      sm:before:border-[12px] 
      sm:before:border-t-[#1E1C26]
      sm:before:border-r-[#1E1C26]
      sm:before:border-b-transparent
      sm:before:border-l-transparent animate-bounce-in-up'
    >
      <form method='dialog' className='flex flex-col justify-center gap-3 ' onSubmit={handleSubmit}>
        <textarea
          name='comment'
          id='comment'
          className='p-2.5 w-full border-none outline-none resize-none bg-[#1E1C26] text-white placeholder-slate-400'
          cols={30}
          placeholder='Dejame un comentario...'
          ref={commentRef}
          value={comment}
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
        ></textarea>
        <button
          type='submit'
          className={`flex justify-end ${!comment && 'cursor-not-allowed'}`}
          title='Send comment'
          disabled={!Boolean(comment)}
        >
          <SendIc
            className={`${
              comment ? 'bg-purple-800' : 'bg-transparent'
            } rounded-md h-6 w-6 p-1 text-white`}
          />
        </button>
      </form>
    </div>
  )
}

export default DialogComment
