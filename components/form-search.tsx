import { FormEvent, useRef } from 'react'

import { CREATORS_DATA } from 'data/creators'

type SearchProps = {
  nameClass?: string
}

const FormSearch = ({ nameClass }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const txtValue = inputRef.current?.value.toLowerCase()
    if (txtValue) {
      const data = CREATORS_DATA.filter((creator) => creator.id.toLowerCase().includes(txtValue))
      console.log(data)
    }
  }
  return (
    <form
      className={`flex flex-col gap-5 md:flex-row md:items-center w-full ${nameClass ?? ''}`}
      onSubmit={handleSubmit}
    >
      <div className='relative w-full'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type='text'
          id='voice-search'
          className='bg-gradient-to-l from-[#192957] to-[#211d45] border dark:border-gray-500 dark:text-white text-sm rounded-lg block w-full pl-10 p-2.5 dark:placeholder-gray-500 focus:outline-none focus:ring-1 dark:focus:ring-indigo-500 dark:focus:border-indigo-500'
          placeholder='Busca creadores de contenido...'
          autoComplete='off'
          autoCorrect='off'
          autoFocus
        />
      </div>
    </form>
  )
}

export default FormSearch
