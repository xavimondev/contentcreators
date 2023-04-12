'use client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { shuffleArray } from 'utils/shuffleArray'
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
        columnsCountBreakPoints={{ 320: 1, 450: 2, 900: 3, 1286: 4, 1500: 5 }}
        className='animate-fadeIn'
      >
        <Masonry gutter='10px'>
          {shuffleArray(listCreators).map(
            ({ id, name, description, categories, social, profileUrl }) => (
              <CreatorCard
                key={id}
                name={name}
                description={description}
                categories={categories}
                socialLinks={social}
                profileUrl={profileUrl}
              />
            )
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default ListCreator
