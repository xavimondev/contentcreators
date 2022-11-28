import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import Image from 'next/image'

import { User } from 'types'

import { signInWithGitHub, signout } from 'services/auth'

import { CommentIc, GitHubIc, LogoutIc } from 'components/icons'

type ToolbarUserProps = {
  creatorId: string
  user: User | null
  buttonCommentRef: RefObject<HTMLButtonElement>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ToolbarUser = ({ creatorId, user, buttonCommentRef, setIsOpen }: ToolbarUserProps) => {
  const [userSession, setUserSession] = useState<User | null>(user)

  return (
    <div className='fixed flex flex-row justify-center gap-1 left-0 right-0 bottom-4 sm:bottom-4 sm:right-4 sm:left-auto rounded-3xl bg-slate-900 w-3/4 m-auto sm:w-60 px-6 py-4'>
      {userSession ? (
        <div className='flex flex-row items-center justify-center gap-4 sm:gap-3 w-full'>
          <div className='relative w-6 h-6'>
            <Image
              src={userSession.avatarUrl}
              className='rounded-full'
              alt={userSession.fullName}
              layout='fill'
            />
          </div>
          <span className='text-base font-semibold text-white'>{userSession.username}</span>
          <div className='flex flex-row gap-4 sm:gap-3'>
            <button ref={buttonCommentRef} onClick={() => setIsOpen(true)}>
              <CommentIc className='w-6 h-6 text-white' />
            </button>
            <button
              onClick={() => {
                setUserSession(null)
                signout()
              }}
            >
              <LogoutIc className='w-6 h-6 text-white' />
            </button>
          </div>
        </div>
      ) : (
        <button
          className='flex flex-row items-center justify-center gap-3 sm:gap-2 w-full'
          onClick={() => signInWithGitHub(creatorId)}
        >
          <span className='text-base font-semibold text-white'>Iniciar Sesión</span>
          <GitHubIc className='w-6 h-6 text-white' />
        </button>
      )}
    </div>
  )
}

export default ToolbarUser
