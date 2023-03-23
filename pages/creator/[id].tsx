import { useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Toaster } from 'react-hot-toast'
import { DefaultSeo } from 'next-seo'
import { useSession } from '@supabase/auth-helpers-react'

import { useStore } from 'state/store'

import useOnClickOutside from 'hooks/useOnClickOutside'
import useComments from 'hooks/useComments'

import { User } from 'types'

import { CREATORS_DATA } from 'data/creators'

import { LeftArrowIc } from 'components/icons'
import Layout from 'components/layout'
import DialogComment from 'components/dialog'
import ToolbarUser from 'components/toolbar-user'
import StoriesCreator from 'components/stories-creator'
import Modal from 'components/modal'
import CreatorComments from 'components/creator-comments'
import CreatorProfile from 'components/creator-profile'

type DashboardProps = {
  user: User
}

const DashboardCreator: NextPage<DashboardProps> = ({ user }) => {
  const router = useRouter()
  const { id } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonCommentRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isModalStoryOpen = useStore((state) => state.isModalStoryOpen)

  const session = useSession()

  const { addComment } = useComments(id as string)
  useOnClickOutside(buttonCommentRef, dialogRef, () => setIsOpen(false))
  let creatorInfo = null,
    title = ''

  if (id) {
    creatorInfo = CREATORS_DATA.find((creator) => creator.id === id)
    title = `content.[creators] | ${creatorInfo?.name}`
  }

  return (
    <>
      <DefaultSeo
        title={title}
        description={`Déjale un mensaje a ${creatorInfo?.name} 🙂`}
        openGraph={{
          type: 'website',
          url: `https://contentcreators.vercel.app/creator/${id}`,
          locale: 'es_ES',
          images: [
            {
              url: `https://contentcreators.vercel.app/api/og?username=${id}`,
              type: 'image/png'
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />
      <Layout>
        <div className='mb-6'>
          <button className='flex flex-row gap-2 items-center' onClick={() => router.back()}>
            <LeftArrowIc className='h-6 w-6 lg:h-8 lg:w-8 text-white' />
            <span className='text-center text-base sm:text-lg lg:text-xl text-white'>Regresar</span>
          </button>
        </div>
        <CreatorProfile />
        <CreatorComments creatorInfoName={creatorInfo?.name} />
        <ToolbarUser
          creatorId={id as string}
          user={user}
          buttonCommentRef={buttonCommentRef}
          setIsOpen={setIsOpen}
          session={session}
        />
        {isOpen && <DialogComment dialogRef={dialogRef} onSave={addComment} />}
      </Layout>
      <Toaster />
      {isModalStoryOpen && (
        <Modal>
          <StoriesCreator />
        </Modal>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession()

  let userInfo: User | null = null

  if (session) {
    const { user } = session
    const {
      user_metadata: { avatar_url, user_name, full_name }
    } = user

    userInfo = {
      userId: user.id,
      fullName: full_name,
      username: user_name,
      avatarUrl: avatar_url
    }
  }

  return {
    props: {
      user: userInfo
    }
  }
}

export default DashboardCreator
