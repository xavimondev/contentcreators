import { Comment } from 'types'

import CommentCard from './comment'

type ListCommentProps = {
  listComments: Comment[]
}

const ListComment = ({ listComments }: ListCommentProps) => {
  return (
    <div className='flex flex-col sm:flex-row flex-1 gap-4 w-full'>
      {listComments.map((data: Comment) => (
        <CommentCard key={data.id} commentInfo={data} />
      ))}
    </div>
  )
}

export default ListComment
