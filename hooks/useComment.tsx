import toast from 'react-hot-toast'
import { useSession } from '@supabase/auth-helpers-react'

import { toastError, toastPromise } from 'utils/showToast'
import { getMillisecondsFromTimestamp } from 'utils/getMillisecondsFromTimestamp'

import type { Comment } from 'types'

import { useStore } from 'state/store'

import {
  saveComment,
  removeComment,
  editComment,
  saveCommentInCache,
  updateCommentInCache,
  deleteCommentInCache
} from 'services/comment'

import { ConfirmToast } from 'components/custom-toast'
import { useRouter } from 'next/router'

const useComment = () => {
  const addNewCommentToList = useStore((state) => state.addNewCommentToList)
  const removeCommentFromList = useStore((state) => state.removeCommentFromList)
  const session = useSession()
  const router = useRouter()
  const username = String(router.query.id)

  const addComment = async (content: string) => {
    if (content === '') {
      toastError('No se puede guardar un comentario sin contenido.')
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
    // Save comments on database
    const commentPromise = saveComment(newCommentDB)

    toastPromise(commentPromise, {
      loading: 'Guardando...',
      success: (dataPromise: any) => {
        const { data } = dataPromise
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
        saveCommentInCache(cacheData).then(console.log)
        return <b>Mensaje guardado.</b>
      },
      error: () => <b>Se ha detectado un error en el servidor. Intentalo nuevamente.</b>
    })
  }

  const deleteComment = async (commentId: number) => {
    toast.custom((t) => (
      <ConfirmToast
        customToast={t}
        acceptFunction={() => {
          // Remove toast confirmation from viewport
          toast.remove(t.id)
          const commentPromise = removeComment(commentId)
          toastPromise(commentPromise, {
            loading: 'Eliminando...',
            success: () => {
              // Remove comment from stories
              deleteCommentInCache(commentId).then(console.log)
              // Remove comments from list
              removeCommentFromList(commentId)
              return <b>Comentario eliminado.</b>
            },
            error: () => {
              return <b>Se ha detectado un error en el servidor. Intentalo nuevamente.</b>
            }
          })
        }}
      />
    ))
  }

  const updateComment = async (commentId: number, commentValue: string) => {
    if (commentValue === '') {
      toastError('No se puede guardar un comentario sin contenido')
      return
    }

    const data = {
      id: commentId,
      content: commentValue
    }

    const commentPromise = editComment(data)

    toastPromise(commentPromise, {
      loading: 'Guardando...',
      success: () => {
        updateCommentInCache(commentId, commentValue).then(console.log)
        return <b>Mensaje Actualizado.</b>
      },
      error: () => <b>Se ha detectado un error en el servidor. Intentalo nuevamente.</b>
    })
  }

  return {
    addComment,
    deleteComment,
    updateComment
  }
}

export default useComment
