import { lazy, Suspense, useRef, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { DefaultSeo } from 'next-seo'
import { useSession } from '@supabase/auth-helpers-react'

import { useStore } from 'state/store'

import useOnClickOutside from 'hooks/useOnClickOutside'
import useComments from 'hooks/useComments'

import type { Creator } from 'types'

import { CREATORS_DATA } from 'data/creators'

import { LeftArrowIc } from 'components/icons'
import Layout from 'components/layout'
import DialogComment from 'components/dialog'
import ToolbarUser from 'components/toolbar-user'
import StoriesCreator from 'components/stories-creator'
import CreatorComments from 'components/creator-comments'
import CreatorProfile from 'components/creator-profile'
import PageHeader from 'components/page-header'

const Modal = lazy(() => import('components/modal'))

type DashboardCreatorProps = {
  creatorInfo: Creator
}

const DashboardCreator: NextPage<DashboardCreatorProps> = ({ creatorInfo }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonCommentRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isModalStoryOpen = useStore((state) => state.isModalStoryOpen)
  const session = useSession()
  const { addComment } = useComments(creatorInfo.id)
  useOnClickOutside(buttonCommentRef, dialogRef, () => setIsOpen(false))

  const title = `content.[creators] | ${creatorInfo.name}`

  return (
    <>
      <DefaultSeo
        title={title}
        description={`Déjale un mensaje a ${creatorInfo.name} 🙂`}
        openGraph={{
          type: 'website',
          url: `https://contentcreators.vercel.app/creator/${creatorInfo.id}`,
          locale: 'es_ES',
          images: [
            {
              url: `https://contentcreators.vercel.app/api/og?username=${creatorInfo.id}`,
              type: 'image/png'
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />
      <PageHeader>
        <button className='flex flex-row gap-2 items-center' onClick={() => router.back()}>
          <LeftArrowIc className='h-6 w-6 lg:h-8 lg:w-8 text-white' />
          <span className='text-center text-base sm:text-lg lg:text-xl text-white'>Regresar</span>
        </button>
      </PageHeader>
      <Layout>
        <CreatorProfile creatorInfo={creatorInfo} />
        <CreatorComments creatorInfoName={creatorInfo.name} />
        <ToolbarUser
          creatorId={creatorInfo.id}
          buttonCommentRef={buttonCommentRef}
          setIsOpen={setIsOpen}
          session={session}
        />
        {isOpen && <DialogComment dialogRef={dialogRef} onSave={addComment} />}
      </Layout>
      <Toaster />
      {isModalStoryOpen && (
        <Suspense fallback='Loading stories'>
          <Modal>
            <StoriesCreator />
          </Modal>
        </Suspense>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ creatorInfo: Creator }> = async (context) => {
  const { id } = context.query
  const creatorInfo = CREATORS_DATA.find((creator) => creator.id === id)
  if (!creatorInfo) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }

  return {
    props: {
      creatorInfo
    }
  }
}

export default DashboardCreator
