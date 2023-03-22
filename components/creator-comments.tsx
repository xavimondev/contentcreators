import { useRouter } from 'next/router'

import useComments from 'hooks/useComments'

import ListComment from 'components/list-comment'
import NoCommentsFound from 'components/no-comments-found'
import FallBackLoader from 'components/fallback'

type CreatorCommentsProps = {
  creatorInfoName: string | undefined
}

const CreatorComments = ({ creatorInfoName }: CreatorCommentsProps) => {
  const router = useRouter()
  const { id } = router.query
  const { listComments, isLoadingComments, deleteComment, updateComment } = useComments(
    id as string
  )

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
      {!isLoadingComments && listComments.length === 0 && (
        <NoCommentsFound data={creatorInfoName} />
      )}
    </section>
  )
}

export default CreatorComments
