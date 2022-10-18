import HeaderTitle from 'components/header-title'
import Layout from 'components/layout'
import { LIST_CATEGORIES } from 'data'
import { CategoryCard } from 'components/category'

const Categories = () => {
  return (
    <Layout>
      <HeaderTitle msg='Categorías' />
      <div className='max-w-6xl mx-auto'>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {/* Gradients */}
          {LIST_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Categories
