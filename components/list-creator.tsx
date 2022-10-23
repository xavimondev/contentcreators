import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import type { Creator } from 'types'
import CreatorCard from 'components/creator'

type PropsListCreator = {
  listCreators: Creator[]
}

const ListCreator = ({ listCreators }: PropsListCreator) => {
  return (
    <>
      {/* Section */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
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
    </>
  )
}

export default ListCreator
