'use client'
import { ChangeEvent, Dispatch, SetStateAction, useState, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { useStore } from 'state/store'
import { api } from 'data/api'
import { LoadingIc, SearchIc } from './icons'

type SearchProps = {
  setIsSearching: Dispatch<SetStateAction<boolean>>
  setQuery: Dispatch<SetStateAction<string>>
}

const FormSearch = ({ setIsSearching, setQuery }: SearchProps) => {
  const setListCreators = useStore((state) => state.setListCreators)
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const autoCompleteDebounce = useCallback(
    debounce(async (query: string) => {
      const data = await api.search(undefined, query)
      setListCreators(data)
      setIsTyping(false)
      setQuery(query)
    }, 250),
    []
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const query = e.target.value
    setIsTyping(true)
    // it's an indicator that tells app whether users is searching or not
    setIsSearching(true)
    // trigger debounce
    autoCompleteDebounce(query)
  }

  return (
    <form className='flex flex-col gap-5 md:flex-row md:items-center w-full mb-3'>
      <div className='relative w-full'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          {isTyping ? (
            <LoadingIc className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' />
          ) : (
            <SearchIc />
          )}
        </div>
        <input
          type='search'
          className='bg-[#1E1C26] 
            border-none 
            dark:text-white 
            text-sm 
            rounded-lg 
            block 
            w-full 
            pl-10 
            p-2.5 
            dark:placeholder-gray-500 
            focus:outline-none focus:ring-1 
            dark:focus:ring-purple-400'
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
