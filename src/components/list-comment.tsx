'use client'
import type { Comment } from 'types'
import CommentCard from './comment-card'

type ListCommentProps = {
  listComments: Comment[]
  deleteComment: (commentId: number) => void
  updateComment: (commentId: number, commentValue: string) => void
}

const ListComment = ({ listComments, deleteComment, updateComment }: ListCommentProps) => {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(1fr,_1fr))] sm:grid-cols-[repeat(auto-fill,minmax(320px,_1fr))] gap-4 w-full'>
      {listComments.map((data: Comment) => (
        <CommentCard
          key={data.id}
          commentInfo={data}
          handleDelete={deleteComment}
          updateComment={updateComment}
        />
      ))}
    </div>
  )
}

export default ListComment
