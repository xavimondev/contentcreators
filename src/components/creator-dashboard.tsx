'use client'
import { lazy, Suspense, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Creator } from 'types'
import { useStore } from 'state/store'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import useComment from '@/hooks/useComment'
import SupabaseProvider from '@/provider/supabase-provider'
import DialogComment from '@/components/dialog'
import CreatorComments from '@/components/creator-comments'
import StoriesCreator from '@/components/stories-creator'
import CreatorProfile from '@/components/creator-profile'
import ToolbarUser from '@/components/toolbar-user'

const Modal = lazy(() => import('./modal'))

type CreatorDashboardProps = {
  creatorInfo: Creator
}

const CreatorDashboard = ({ creatorInfo }: CreatorDashboardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { addComment } = useComment(creatorInfo.username)
  const buttonCommentRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isModalStoryOpen = useStore((state) => state.isModalStoryOpen)
  useOnClickOutside(buttonCommentRef, dialogRef, () => setIsOpen(false))

  return (
    <>
      <SupabaseProvider>
        <main className='p-6 min-h-screen h-full w-full'>
          <CreatorProfile creatorInfo={creatorInfo} />
          <CreatorComments creatorInfo={creatorInfo} />
          <ToolbarUser
            creatorId={creatorInfo.id}
            buttonCommentRef={buttonCommentRef}
            setIsOpen={setIsOpen}
          />
          {isOpen && <DialogComment dialogRef={dialogRef} onSave={addComment} />}
          {isModalStoryOpen && (
            <Suspense fallback='Loading stories'>
              <Modal>
                <StoriesCreator />
              </Modal>
            </Suspense>
          )}
        </main>
      </SupabaseProvider>
      <Toaster />
    </>
  )
}

export default CreatorDashboard
