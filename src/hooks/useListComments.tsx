import { useEffect } from 'react'
import { useStore } from 'state/store'
import { listCommentsByCreator } from 'services/comment'

const useListComments = (contentCreatorId: string) => {
  const listComments = useStore((state) => state.listComments)
  const setListComments = useStore((state) => state.setListComments)
  const isLoadingComments = useStore((state) => state.isLoadingComments)
  const setIsLoadingComments = useStore((state) => state.setIsLoadingComments)

  useEffect(() => {
    listCommentsByCreator(contentCreatorId)
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
  }, [])

  return {
    listComments,
    isLoadingComments
  }
}

export default useListComments
