'use client'
import { Creator } from 'types'
import useListComments from '@/hooks/useListComments'
import useComment from '@/hooks/useComment'
import ListComment from './list-comment'
import NoCommentsFound from './no-comments-found'
import FallBackLoader from './fallback'

type CreatorCommentsProps = {
  creatorInfo: Creator
}

const CreatorComments = ({ creatorInfo }: CreatorCommentsProps) => {
  const { name, id, username } = creatorInfo
  const { listComments, isLoadingComments } = useListComments(id)
  const { deleteComment, updateComment } = useComment(username)

  return (
    <section className='mt-6'>
      {isLoadingComments && <FallBackLoader msg='Cargando resultados' />}
      {listComments && listComments.length > 0 && !isLoadingComments && (
        <ListComment
          listComments={listComments}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      )}
      {!isLoadingComments && listComments.length === 0 && <NoCommentsFound data={name} />}
    </section>
  )
}

export default CreatorComments
