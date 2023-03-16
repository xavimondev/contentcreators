import { useEffect, useState } from 'react'

const useComments = (username: string) => {
  const [listComments, setListComments] = useState<Comment[]>([])

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

  return {
    listComments,
    setListComments
  }
}

export default useComments
