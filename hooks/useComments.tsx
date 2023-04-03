import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSession } from '@supabase/auth-helpers-react'

import { getMillisecondsFromTimestamp } from 'utils/getMillisecondsFromTimestamp'

import type { Comment } from 'types'

import { useStore } from 'state/store'

import {
  saveComment,
  removeComment,
  editComment,
  saveCommentInCache,
  updateCommentInCache,
  deleteCommentInCache,
  listCommentsByCreator
} from 'services/comment'

import { ConfirmToast } from 'components/custom-toast'

const useComments = (username: string) => {
  const listComments = useStore((state) => state.listComments)
  const setListComments = useStore((state) => state.setListComments)
  const addNewCommentToList = useStore((state) => state.addNewCommentToList)
  const removeCommentFromList = useStore((state) => state.removeCommentFromList)
  const isLoadingComments = useStore((state) => state.isLoadingComments)
  const setIsLoadingComments = useStore((state) => state.setIsLoadingComments)
  const session = useSession()

  useEffect(() => {
    if (username) {
      setIsLoadingComments(true)
      listCommentsByCreator(username)
        .then((response) => {
          const { status, data } = response
          if (status === 1) {
            setListComments(data)
          }
          // TODO: Display error message
        })
        .finally(() => {
          setIsLoadingComments(false)
        })
    }
  }, [])

  const addComment = async (content: string) => {
    if (content === '') {
      toast.error('No se puede guardar un comentario sin contenido', {
        duration: 2000,
        position: 'top-center'
      })
      return
    }
    // I used non null assertion since users will use addComment when they are authenticated
    const { user } = session!
    const {
      user_metadata: { avatar_url: avatarUrl, user_name: authorUsername, full_name: fullName }
    } = user
    const newCommentDB = {
      userId: user.id,
      content,
      username
    }

    const commentPromise = saveComment(newCommentDB)

    toast.promise(
      commentPromise,
      {
        loading: 'Guardando...',
        success: (dataPromise) => {
          const { data, error } = dataPromise!
          if (!error) {
            const { id, createdAt } = data![0]
            const newComment: Comment = {
              id,
              message: content,
              authorId: user.id,
              author: fullName,
              authorAvatar: avatarUrl,
              authorUsername,
              createdAt
            }
            addNewCommentToList(newComment)

            // Saving in cache
            const cacheData = {
              commentId: id,
              creatorUsername: username,
              commentAuthor: fullName.replace(' ', '-'),
              commentValue: content,
              createdAtMilliseconds: getMillisecondsFromTimestamp(createdAt)
            }
            saveCommentInCache(cacheData).then((res) => {
              console.log(res)
            })
            return <b>Mensaje guardado.</b>
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

  const deleteComment = async (commentId: number) => {
    toast.custom((t) => (
      <ConfirmToast
        customToast={t}
        acceptFunction={() => {
          // Remove toast confirmation from viewport
          toast.remove(t.id)
          const commentPromise = removeComment(commentId)
          toast.promise(
            commentPromise,
            {
              loading: 'Eliminando...',
              success: (error) => {
                if (!error) {
                  // Remove comment from stories
                  deleteCommentInCache(commentId).then(console.log)
                  // Remove comments from list
                  removeCommentFromList(commentId)
                }
                return <b>Comentario eliminado.</b>
              },
              error: () => {
                return <b>Se ha detectado un error en el servidor. Intentalo nuevamente.</b>
              }
            },
            {
              style: {
                minWidth: '315px'
              },
              success: {
                duration: 1000,
                icon: '😊'
              },
              error: {
                duration: 4000,
                icon: '😱'
              }
            }
          )
        }}
      />
    ))
  }

  const updateComment = async (commentId: number, commentValue: string) => {
    if (commentValue === '') {
      toast.error('No se puede guardar un comentario sin contenido', {
        duration: 2000,
        position: 'top-center',
        icon: '👀'
      })
      return
    }
    const data = {
      id: commentId,
      content: commentValue
    }

    const commentPromise = editComment(data)

    toast.promise(
      commentPromise,
      {
        loading: 'Guardando...',
        success: ({ error }) => {
          if (!error) {
            updateCommentInCache(commentId, commentValue).then((response) => console.log(response))
            return <b>Mensaje Actualizado.</b>
          }
          return <b>No se pudo actualizar tu mensaje. Intentalo nuevamente.</b>
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

  return {
    listComments,
    isLoadingComments,
    addComment,
    deleteComment,
    updateComment
  }
}

export default useComments
