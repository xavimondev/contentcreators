import { useEffect, useRef, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { CREATORS_DATA } from 'data/creators'

import { signInWithGitHub, signout } from 'services/auth'
import { addComment, listCommentsByCreator } from 'services/comment'

import { SOCIAL_LINKS } from 'components/social-link'
import CustomLink from 'components/custom-link'
import { CommentIc, GitHubIc, HomeIc, LogoutIc } from 'components/icons'
import Layout from 'components/layout'
import DialogComment from 'components/dialog'

type DashboardProps = {
  user: any
  comments: any
}

const DashboardCreator: NextPage<DashboardProps> = ({ user, comments }) => {
  const router = useRouter()
  const { fullName, username, avatarUrl, userId } = user
  const { id } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [listComments, setListComments] = useState<any>(comments)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        !buttonRef.current?.contains(event.target) &&
        !dialogRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  let creatorInfo = null,
    title = ''

  if (id) {
    creatorInfo = CREATORS_DATA.find((creator) => creator.id === id)
    title = `Creador: ${creatorInfo?.name} 🚀`
  }

  const handleSubmit = async (content: string) => {
    const comment = {
      userId,
      content
    }

    const data = await addComment(comment, id as string)

    if (data) {
      const { id } = data[0]
      const newComment = {
        id,
        message: content,
        author: fullName,
        authorAvatar: avatarUrl,
        authorUsername: username
      }
      setListComments((comments: any) => comments.concat(newComment))
    }
    // TODO: Show error message whether there's an error
  }

  return (
    <>
      <Head>
        <title>{title}</title>
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

        <section className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {listComments && listComments.length > 0 ? (
            listComments.map(({ id, message, author, authorAvatar, authorUsername }: any) => (
              <div
                className='flex flex-col gap-3 p-4 bg-white rounded-xl w-full sm:max-w-xs shadow-[-6px_-6px_0_0px_rgb(29,78,216)]'
                key={id}
              >
                <CustomLink href={`https://github.com/${authorUsername}`} target='_blank'>
                  <div className='flex flex-row items-center gap-3'>
                    <div className='relative w-8 h-8'>
                      <Image
                        src={authorAvatar}
                        className='rounded-full'
                        alt={username}
                        layout='fill'
                      />
                    </div>
                    <div className='space-y-0.5'>
                      <span className='font-medium'>{author}</span>
                      <div className='text-sm font-light text-gray-400'>{authorUsername}</div>
                    </div>
                  </div>
                </CustomLink>
                <blockquote>
                  <p className='text-gray-500'>{message}</p>
                </blockquote>
              </div>
            ))
          ) : (
            <section className='mx-auto max-w-6xl md:text-2xl mt-8 flex flex-col gap-4 items-center'>
              <div className='relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80'>
                <Image src='/img/messages.png' alt='Messages Icon' layout='fill' />
              </div>
              <p className='text-white font-semibold text-center'>
                Dejalé un mensaje a{' '}
                <span className='bg-gradient-to-r from-[#d770b2] to-[#e4ad7a] font-bold text-transparent bg-clip-text'>
                  {creatorInfo?.name}
                </span>{' '}
                por su aporte a la comunidad.
              </p>
            </section>
          )}
        </section>
        <div className='fixed flex flex-row justify-center gap-1 left-0 right-0 bottom-4 sm:bottom-4 sm:right-4 sm:left-auto rounded-3xl bg-slate-900 w-3/4 m-auto sm:w-60 px-6 py-4'>
          <button
            className='flex flex-row items-center justify-center gap-3 sm:gap-2 w-full'
            onClick={() => signInWithGitHub(id as string)}
          >
            {avatarUrl ? (
              <>
                <div className='relative w-6 h-6'>
                  <Image src={avatarUrl} className='rounded-full' alt={username} layout='fill' />
                </div>
              </>
            ) : (
              <GitHubIc className='w-6 h-6 text-white' />
            )}
            <span className='text-base font-semibold text-white'>
              {username ?? 'Iniciar Sesión'}
            </span>
          </button>
          {username ? (
            <div className='flex flex-row gap-2'>
              <button ref={buttonRef} onClick={() => setIsOpen(true)}>
                <CommentIc className='w-6 h-6 text-white' />
              </button>
              <button onClick={() => signout()}>
                <LogoutIc className='w-6 h-6 text-white' />
              </button>
            </div>
          ) : null}
        </div>
        {isOpen && <DialogComment dialogRef={dialogRef} onSave={handleSubmit} />}
      </Layout>
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

  let username = null
  let avatarUrl = null
  let userId = ''
  let fullName = ''

  if (session) {
    const { user } = session
    userId = user.id
    const {
      user_metadata: { avatar_url, user_name, full_name }
    } = user
    username = user_name
    avatarUrl = avatar_url
    fullName = full_name
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
      const { id, content, User } = comment
      const { name, photoUrl, username } = User as any
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
      user: {
        userId,
        fullName,
        username,
        avatarUrl
      },
      comments
    }
  }
}

export default DashboardCreator
