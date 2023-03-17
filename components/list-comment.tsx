import { Comment } from 'types'

import CommentCard from './comment'

type ListCommentProps = {
  listComments: Comment[]
  deleteComment: (commentId: number) => void
}

const ListComment = ({ listComments, deleteComment }: ListCommentProps) => {
  return (
    <div className='flex flex-col sm:flex-row flex-1 gap-4 w-full'>
      {listComments.map((data: Comment) => (
        <CommentCard key={data.id} commentInfo={data} handleDelete={deleteComment} />
      ))}
    </div>
  )
}

export default ListComment
