import { Comment } from 'types'

import CommentCard from './comment'

type ListCommentProps = {
  listComments: Comment[]
}

const ListComment = ({ listComments }: ListCommentProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
      {listComments.map((data: Comment, index: number) => (
        <CommentCard
          key={data.id}
          commentInfo={data}
          className={`${index === 0 ? 'animate-pulse' : ''}`}
        />
      ))}
    </div>
  )
}

export default ListComment
