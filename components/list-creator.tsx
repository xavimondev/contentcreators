import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import type { Creator } from 'types'
import CreatorCard from 'components/creator'
import { BlobListCreators } from 'components/blob'

type PropsListCreator = {
  listCreators: Creator[]
}

const ListCreator = ({ listCreators }: PropsListCreator) => {
  return (
    <div className='relative'>
      <BlobListCreators />
      {/* Section */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4, 1200: 5 }}>
        <Masonry gutter='10px'>
          {listCreators.map(({ id, name, description, categories, social }) => (
            <CreatorCard
              key={id}
              id={id}
              name={name}
              description={description}
              categories={categories}
              socialLinks={social}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default ListCreator
