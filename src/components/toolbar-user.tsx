'use client'
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { getDataFromUser } from 'utils/getDataFromUser'
import { useStore } from 'state/store'
import { signInWithGitHub, signout } from 'services/auth'
import { useSupabase } from '@/provider/supabase-provider'
import { CommentIc, GitHubIc, LogoutIc } from './icons'
import Placeholder from './placeholder'

type ToolbarUserProps = {
  creatorId: string
  buttonCommentRef: RefObject<HTMLButtonElement>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ToolbarUser = ({ creatorId, buttonCommentRef, setIsOpen }: ToolbarUserProps) => {
  const userSession = useStore((store) => store.userSession)
  const setUserSession = useStore((store) => store.setUserSession)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { supabase } = useSupabase()

  useEffect(() => {
    const getSession = async () => {
      const result = await supabase.auth.getSession()
      const session = result.data.session
      if (session) {
        const userInfo = getDataFromUser(session)
        // console.log(userInfo)
        setUserSession(userInfo)
      }
      setIsLoading(false)
    }
    getSession()
  }, [])

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
        {isLoading && <Placeholder type='toolbar' length={0} />}
        {userSession && !isLoading && (
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
              {creatorId !== userSession.username && (
                <button
                  aria-label='Open Dialog'
                  ref={buttonCommentRef}
                  onClick={() => setIsOpen(true)}
                >
                  <CommentIc className='w-6 h-6 text-white' />
                </button>
              )}
              <button
                aria-label='Logout'
                onClick={() => {
                  signout(supabase)
                }}
              >
                <LogoutIc className='w-6 h-6 text-white' />
              </button>
            </div>
          </div>
        )}
        {!userSession && !isLoading && (
          <button
            aria-label='Login'
            className='flex flex-row items-center justify-center gap-3 sm:gap-2 w-full'
            onClick={() => signInWithGitHub(supabase, creatorId)}
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
