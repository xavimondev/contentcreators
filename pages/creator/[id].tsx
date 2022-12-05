import { useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSession } from '@supabase/auth-helpers-react'
import toast, { Toaster } from 'react-hot-toast'

import useOnClickOutside from 'hooks/useOnClickOutside'

import { Comment, User } from 'types'

import { CREATORS_DATA } from 'data/creators'

import { listCommentsByCreator, saveComment } from 'services/comment'

import { SOCIAL_LINKS } from 'components/social-link'
import CustomLink from 'components/custom-link'
import { HomeIc } from 'components/icons'
import Layout from 'components/layout'
import DialogComment from 'components/dialog'
import ToolbarUser from 'components/toolbar-user'
import ListComment from 'components/list-comment'
import NoCommentsFound from 'components/no-comments-found'

type DashboardProps = {
  user: User
  comments: Comment[]
}

const DashboardCreator: NextPage<DashboardProps> = ({ user, comments }) => {
  const router = useRouter()
  const { id } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [listComments, setListComments] = useState<Comment[]>(comments)
  const buttonCommentRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const session = useSession()

  useOnClickOutside(buttonCommentRef, dialogRef, () => setIsOpen(false))

  let creatorInfo = null,
    title = ''

  if (id) {
    creatorInfo = CREATORS_DATA.find((creator) => creator.id === id)
    title = `Creador: ${creatorInfo?.name} 🚀`
  }

  const handleSubmit = async (content: string) => {
    // I used non null assertion since users will use handleSubmit when they are authenticated
    const { user } = session!
    const {
      user_metadata: { avatar_url: avatarUrl, user_name: username, full_name: fullName }
    } = user
    const data = {
      userId: user.id,
      content,
      username: id
    }

    const commentPromise = saveComment(data)

    toast.promise(
      commentPromise,
      {
        loading: 'Guardando...',
        success: (data) => {
          const { status, commentId } = data
          if (status) {
            const newComment = {
              id: commentId,
              message: content,
              author: fullName,
              authorAvatar: avatarUrl,
              authorUsername: username
            }
            setListComments((comments) => [newComment, ...comments])
            return <b>Mucha gracias por tu mensaje.</b>
          }
          return <b>No se pudo guardar tu mensaje. Intentalo nuevamente.</b>
        },
        error: () => <b>Se ha detectado un error en el servidor. Intentalo nuevamente.</b>
      },
      {
        style: {
          minWidth: '315px'
        },
        success: {
          duration: 2000,
          icon: '😊'
        },
        error: {
          duration: 4000,
          icon: '😱'
        }
      }
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          property='og:image'
          content={`https://contentcreators.vercel.app/api/og?username=${id}`}
        />
      </Head>
      <Layout>
        <CustomLink href='/'>
          <div className='flex flex-row gap-2 items-center mb-2 text-white'>
            <HomeIc className='h-8 w-8' />
            <span className='text-base'>Regresar a Inicio</span>
          </div>
        </CustomLink>
        <section className='mt-10 p-4 flex flex-col gap-2 md:gap-4 bg-slate-900 rounded-xl'>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center'>
            <div className='object-cover w-24 md:w-32 h-auto'>
              <Image
                className='rounded-xl duration-700 ease-in-out'
                src={`https://unavatar.io/github/${id}`}
                width='256'
                height='256'
                alt={creatorInfo?.name}
              />
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
              <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-[#d770b2] to-[#e4ad7a] font-bold tracking-wide text-xl md:text-2xl lg:text-5xl'>
                {creatorInfo?.name}
              </h2>
              <p className='font-semibold text-base sm:text-lg lg:text-xl text-white'>
                {creatorInfo?.description}
              </p>
            </div>
          </div>
          <div className='flex gap-1 md:gap-3 flex-wrap md:flex-row'>
            {creatorInfo?.social.map((item) => {
              const Component = SOCIAL_LINKS.find((link) => link.id === item.id)?.Component
              return (
                <CustomLink href={item.url} key={item.id} rel='noopener noreferrer' target='_blank'>
                  <div className='p-2 rounded-lg transition hover:scale-110'>{Component}</div>
                </CustomLink>
              )
            })}
          </div>
        </section>

        <section className='mt-6'>
          {listComments && listComments.length > 0 ? (
            <ListComment listComments={listComments} />
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
        {isOpen && <DialogComment dialogRef={dialogRef} onSave={handleSubmit} />}
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
  const {
    query: { id }
  } = ctx

  // Fetching comments
  let comments = null
  if (id) {
    comments = await listCommentsByCreator(id as string)
  }

  if (comments) {
    comments = comments.map((comment) => {
      const { id, content, user } = comment
      const { name, photoUrl, username } = user
      return {
        id,
        message: content,
        author: name,
        authorAvatar: photoUrl,
        authorUsername: username
      }
    })
  }

  return {
    props: {
      user: userInfo,
      comments
    }
  }
}

export default DashboardCreator
