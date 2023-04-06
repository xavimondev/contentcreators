'use client'
import type { Comment } from 'types'
import useComment from '@/hooks/useComment'
import CommentCard from './comment-card'

type ListCommentProps = {
  listComments: Comment[]
}

const ListComment = ({ listComments }: ListCommentProps) => {
  const { deleteComment, updateComment } = useComment()

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
