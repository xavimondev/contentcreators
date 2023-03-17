import { useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Toaster } from 'react-hot-toast'
import { DefaultSeo } from 'next-seo'
import { useSession } from '@supabase/auth-helpers-react'

import useOnClickOutside from 'hooks/useOnClickOutside'
import useComments from 'hooks/useComments'

import { User } from 'types'

import { CREATORS_DATA } from 'data/creators'

import { SOCIAL_LINKS } from 'components/social-link'
import CustomLink from 'components/custom-link'
import { LeftArrowIc } from 'components/icons'
import Layout from 'components/layout'
import DialogComment from 'components/dialog'
import ToolbarUser from 'components/toolbar-user'
import ListComment from 'components/list-comment'
import NoCommentsFound from 'components/no-comments-found'

type DashboardProps = {
  user: User
}

const DashboardCreator: NextPage<DashboardProps> = ({ user }) => {
  const router = useRouter()
  const { id } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonCommentRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const session = useSession()

  const { listComments, addComment, deleteComment, updateComment } = useComments(id as string)
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
        <div className='flex flex-row gap-2 items-center mb-12'>
          <CustomLink href='/'>
            <LeftArrowIc className='h-6 w-6 lg:h-8 lg:w-8 text-white' />
          </CustomLink>
          <span className='text-center text-base sm:text-lg lg:text-xl text-white'>
            Todas las categorías
          </span>
        </div>
        <section className='mt-10 p-0.5 flex flex-col gap-2 md:gap-4 rounded-xl bg-gradient-to-r from-indigo-500 to-[#d5578f]'>
          <div className='bg-[#1E1C26] rounded-xl p-4'>
            <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center'>
              <div className='object-cover w-24 md:w-32 h-auto'>
                <Image
                  className='rounded-xl duration-700 ease-in-out'
                  src={`https://unavatar.io/github/${id}`}
                  width='256'
                  height='256'
                  alt={creatorInfo!.name}
                />
              </div>
              <div className='flex flex-col gap-2 md:gap-4'>
                <h2 className='text-white font-bold tracking-wide text-xl sm:text-2xl lg:text-5xl'>
                  {creatorInfo?.name}
                </h2>
                <p className='text-base sm:text-lg lg:text-xl dark:text-gray-400'>
                  {creatorInfo?.description}
                </p>
              </div>
            </div>
            <div className='flex gap-1 md:gap-3 flex-wrap md:flex-row mt-4 sm:mt-2'>
              {creatorInfo?.social.map((item) => {
                const Component = SOCIAL_LINKS.find((link) => link.id === item.id)?.Component
                return (
                  <CustomLink
                    href={item.url}
                    key={item.id}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <div className='p-2 rounded-lg transition hover:scale-110'>{Component}</div>
                  </CustomLink>
                )
              })}
            </div>
          </div>
        </section>
        <section className='mt-6'>
          {listComments && listComments.length > 0 ? (
            <ListComment
              listComments={listComments}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          ) : (
            <NoCommentsFound data={creatorInfo?.name} />
          )}
        </section>
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
