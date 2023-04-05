import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useStore } from 'state/store'

import { listCommentsByCreator } from 'services/comment'

const useListComments = () => {
  const listComments = useStore((state) => state.listComments)
  const setListComments = useStore((state) => state.setListComments)
  const isLoadingComments = useStore((state) => state.isLoadingComments)
  const setIsLoadingComments = useStore((state) => state.setIsLoadingComments)
  const router = useRouter()
  const username = String(router.query.id)

  useEffect(() => {
    if (username) {
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
  }, [username])

  return {
    listComments,
    isLoadingComments
  }
}

export default useListComments
