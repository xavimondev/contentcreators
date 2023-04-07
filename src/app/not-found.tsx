import CustomLink from '@/components/custom-link'

export default function NotFound() {
  return (
    <main className='p-6 min-h-screen h-full w-full'>
      <div className='py-32 max-w-4xl mx-auto'>
        <div className='flex flex-col gap-8 text-center sm:items-center'>
          <h1 className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d770b2] to-[#e4ad7a]'>
            Página no encontrada
          </h1>
          <p className='text-xl text-white font-semibold'>
            Al parecer el acceso a la página ha sido eliminado o nunca existió.
          </p>
          <CustomLink
            href='/'
            classes='bg-indigo-700 rounded-xl py-4 md:py-3 px-12 text-white font-bold'
          >
            Ir a Inicio
          </CustomLink>
        </div>
      </div>
    </main>
  )
}
