import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { Session } from '@supabase/supabase-js'

import { User } from 'types'

import { signInWithGitHub, signout } from 'services/auth'

import { CommentIc, GitHubIc, LogoutIc } from 'components/icons'

type ToolbarUserProps = {
  creatorId: string
  user: User | null
  buttonCommentRef: RefObject<HTMLButtonElement>
  setIsOpen: Dispatch<SetStateAction<boolean>>
  session: Session | null
}

const ToolbarUser = ({
  creatorId,
  user,
  buttonCommentRef,
  setIsOpen,
  session
}: ToolbarUserProps) => {
  const [userSession, setUserSession] = useState<User | null>(user)

  useEffect(() => {
    if (session) {
      const { user } = session
      const {
        user_metadata: { avatar_url, user_name, full_name }
      } = user

      const userInfo = {
        userId: user.id,
        fullName: full_name,
        username: user_name,
        avatarUrl: avatar_url
      }
      setUserSession(userInfo)
    }
  }, [session])

  return (
    <div
      className='fixed 
      flex 
      flex-row 
      justify-center 
      gap-1 left-0 
      right-0 
      bottom-4 
      sm:bottom-4 
      sm:right-4 
      sm:left-auto 
      rounded-3xl 
      p-0.5
      bg-gradient-to-r from-indigo-500 to-[#d5578f]
      w-3/4 
      m-auto 
      sm:w-72'
    >
      <div className='rounded-3xl bg-[#1E1C26] px-6 py-4 w-full'>
        {userSession ? (
          <div className='flex flex-row items-center justify-center gap-4 sm:gap-3 w-full'>
            <div className='relative w-6 h-6'>
              <Image
                src={userSession.avatarUrl}
                className='rounded-full'
                alt={userSession.fullName}
                fill
              />
            </div>
            <span className='text-base font-semibold text-white'>{userSession.username}</span>
            <div className='flex flex-row gap-4 sm:gap-3'>
              <button
                aria-label='Open Dialog'
                ref={buttonCommentRef}
                onClick={() => setIsOpen(true)}
              >
                <CommentIc className='w-6 h-6 text-white' />
              </button>
              <button
                aria-label='Logout'
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
            aria-label='Login'
            className='flex flex-row items-center justify-center gap-3 sm:gap-2 w-full'
            onClick={() => signInWithGitHub(creatorId)}
          >
            <span className='text-base font-semibold text-white'>Iniciar Sesión</span>
            <GitHubIc className='w-6 h-6 text-white' />
          </button>
        )}
      </div>
    </div>
  )
}

export default ToolbarUser
