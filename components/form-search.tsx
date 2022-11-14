import { ChangeEvent, Dispatch, SetStateAction, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import debounce from 'just-debounce-it'

import type { Creator } from 'types'
import { LoadingIc, SearchIc } from './icons'

type SearchProps = {
  nameClass?: string
  setCreators: Dispatch<SetStateAction<Creator[]>>
  setIsSearching: Dispatch<SetStateAction<boolean>>
  setQuery: Dispatch<SetStateAction<string>>
}

const FormSearch = ({ nameClass, setCreators, setIsSearching, setQuery }: SearchProps) => {
  const router = useRouter()
  const { id: categoryId } = router.query
  const currentPath = router.asPath.split('?')[0]
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const autoCompleteDebounce = useCallback(
    debounce(async (query: string) => {
      setCreators([])
      setIsTyping(false)
      setQuery(query)
      router.push(
        {
          pathname: currentPath,
          query: { q: query }
        },
        undefined,
        { shallow: true }
      )
    }, 250),
    []
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const query = e.target.value
    if (!query) {
      router.replace(currentPath, undefined, { shallow: true })
      return
    }
    setIsTyping(true)
    // it's an indicator that tells app whether users is searching or not
    setIsSearching(true)
    // trigger debounce
    autoCompleteDebounce(query)
  }

  return (
    <form className={`flex flex-col gap-5 md:flex-row md:items-center w-full ${nameClass ?? ''}`}>
      <div className='relative w-full'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          {isTyping ? <LoadingIc /> : <SearchIc />}
        </div>
        <input
          type='search'
          className='bg-gradient-to-l from-[#192957] to-[#211d45] border dark:border-gray-500 dark:text-white text-sm rounded-lg block w-full pl-10 p-2.5 dark:placeholder-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-indigo-500 dark:focus:border-indigo-500'
          placeholder='Busca creadores de contenido...'
          autoComplete='off'
          autoCorrect='off'
          onChange={handleInputChange}
          autoFocus
        />
      </div>
    </form>
  )
}

export default FormSearch
