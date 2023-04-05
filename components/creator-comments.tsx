import useListComments from 'hooks/useListComments'

import ListComment from 'components/list-comment'
import NoCommentsFound from 'components/no-comments-found'
import FallBackLoader from 'components/fallback'

type CreatorCommentsProps = {
  creatorInfoName: string
}

const CreatorComments = ({ creatorInfoName }: CreatorCommentsProps) => {
  const { listComments, isLoadingComments } = useListComments()

  return (
    <section className='mt-6'>
      {isLoadingComments && <FallBackLoader msg='Cargando resultados' />}
      {listComments && listComments.length > 0 && !isLoadingComments && (
        <ListComment listComments={listComments} />
      )}
      {!isLoadingComments && listComments.length === 0 && (
        <NoCommentsFound data={creatorInfoName} />
      )}
    </section>
  )
}

export default CreatorComments
