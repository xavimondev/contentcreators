'use client'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { createBrowserSupabaseClient, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useStore } from 'state/store'
import { getDataFromUser } from 'utils/getDataFromUser'

type SupabaseContext = {
  supabase: SupabaseClient<any>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({ children }: PropsWithChildren) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()
  const setUserSession = useStore((store) => store.setUserSession)

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session) {
          const userInfo = getDataFromUser(session)
          setUserSession(userInfo)
        }
      } else if (event === 'SIGNED_OUT') {
        setUserSession(null)
      }
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}
