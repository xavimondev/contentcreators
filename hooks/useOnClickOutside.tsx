import { RefObject, useEffect } from 'react'

type Handler = VoidFunction

const useOnClickOutside = (
  buttonCommentRef: RefObject<HTMLButtonElement>,
  dialogRef: RefObject<HTMLDivElement>,
  handler: Handler
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        !buttonCommentRef.current?.contains(event.target) &&
        !dialogRef.current?.contains(event.target)
      ) {
        handler()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useOnClickOutside
