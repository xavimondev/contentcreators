import FormSearch from '../components/form-search'

const Search = () => {
  return (
    <section className='h-screen bg-gradient-to-l from-[#39497e] to-[#1d184e]'>
      <div className='p-4 md:p-10 grid place-items-center max-w-4xl mx-auto h-screen'>
        <div className='flex gap-32 flex-col w-full'>
          <h1 className='text-center font-semibold text-2xl md:text-4xl text-white'>
            Bienvenido a Content Creators
          </h1>
          <FormSearch />
        </div>
      </div>
    </section>
  )
}

export default Search
