'use client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useStore } from 'state/store'
import { BlobListCreators } from './blob'
import CreatorCard from './creator'

const ListCreator = () => {
  const listCreators = useStore((state) => state.listCreators)

  return (
    <div className='relative'>
      <BlobListCreators />
      {/* Section */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4, 1200: 5 }}
        className='animate-fadeIn'
      >
        <Masonry gutter='10px'>
          {listCreators.map(({ id, name, description, categories, social, profileUrl }) => (
            <CreatorCard
              key={id}
              id={id}
              name={name}
              description={description}
              categories={categories}
              socialLinks={social}
              profileUrl={profileUrl}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default ListCreator
