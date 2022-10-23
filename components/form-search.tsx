import { ChangeEvent, Dispatch, SetStateAction, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import debounce from 'just-debounce-it'

import { Creator } from 'types'
import { api } from 'data/api'
import { LoadingIc, SearchIc } from './icons'

type SearchProps = {
  nameClass?: string
  setCreators: Dispatch<SetStateAction<Creator[]>>
}

const FormSearch = ({ nameClass, setCreators }: SearchProps) => {
  const router = useRouter()
  const { id: categoryId } = router.query

  const [isTyping, setIsTyping] = useState<boolean>(false)

  const autoCompleteDebounce = useCallback(
    debounce(async (query: string) => {
      const data = await api.search(categoryId as string, query)
      setCreators(data)
      setIsTyping(false)
    }, 250),
    []
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const query = e.target.value
    setIsTyping(true)
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
          id='voice-search'
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
