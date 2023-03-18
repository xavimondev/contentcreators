import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from '@supabase/auth-helpers-react'

import { Comment } from 'types'

import { saveComment, removeComment, editComment, saveCommentInCache } from 'services/comment'

const useComments = (username: string) => {
  const [listComments, setListComments] = useState<Comment[]>([])
  const session = useSession()

  useEffect(() => {
    if (username) {
      fetch(`/api/comment/?username=${username}`)
        .then((response) => response.json())
        .then((response) => {
          const { status, data } = response
          if (status) {
            setListComments(data)
          }
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
    const data = {
      userId: user.id,
      content,
      username
    }

    const commentPromise = saveComment(data)

    toast.promise(
      commentPromise,
      {
        loading: 'Guardando...',
        success: (data) => {
          const { status, commentId } = data
          if (status) {
            const newComment: Comment = {
              id: commentId,
              message: content,
              author: fullName,
              authorAvatar: avatarUrl,
              authorUsername
            }
            setListComments((comments) => [newComment, ...comments])

            // Saving in cache
            const cacheData = {
              creatorUsername: username,
              commentAuthor: authorUsername,
              commentValue: content
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
    const error = await removeComment(commentId)

    if (!error) {
      const newComments = listComments.filter((comment) => comment.id !== commentId)
      setListComments(newComments)
    }
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
        success: ({ error }: any) => {
          if (!error) {
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
    addComment,
    deleteComment,
    updateComment
  }
}

export default useComments
