import Image from 'next/image'
import Layout from '../components/layout'
import { LIST_CATEGORIES } from '../data'

const Categories = () => {
  return (
    <Layout>
      <h1 className='text-center mb-20 text-3xl dark:text-white font-semibold'>Categorías</h1>
      <div className='max-w-6xl mx-auto'>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {/* Gradients */}
          {LIST_CATEGORIES.map(({ id, color, name, image }) => (
            <article
              key={id}
              className={`w-full rounded-xl bg-gradient-to-l ${color} transition duration-200 ease-in-out group hover:-translate-y-1 `}
            >
              <a href={`category/${id}`} rel='noopener noreferrer'>
                <div className='h-auto flex flex-col gap-8 py-8 px-4'>
                  <Image src={image} height='256' width='256' alt='backend' />
                  <p className='max-w-xl font-extrabold text-white/80'>{name}</p>
                </div>
              </a>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Categories
