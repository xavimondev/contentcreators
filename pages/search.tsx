const Search = () => {
  return (
    <section className='p-4 md:p-10 relative grid place-items-center h-screen bg-gradient-to-l from-[#39497e] to-[#1d184e]'>
      <div className='flex gap-32 flex-col w-full'>
        <h1 className='text-center font-semibold text-2xl md:text-4xl text-white'>
          Bienvenido a Content Creators
        </h1>
        <form className='flex flex-col gap-5 md:flex-row md:items-center w-full'>
          <div className='relative w-full'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
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
              type='text'
              id='voice-search'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:placeholder-gray-400 '
              placeholder='Busca creadores de contenido, tecnologías...'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-gradient-to-tr from-[#8e1d9e] to-[#bc6cc9] py-3 px-7 md:ml-1 text-sm font-semibold text-white bg-blue-700 rounded-lg border-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  )
}

export default Search
