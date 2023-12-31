import { useLoaderData, useSearchParams } from 'react-router-dom'

import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'
import { Feed } from '../types'

const Home = () => {
  const data = useLoaderData() as Feed | null
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <ul className='flex flex-col gap-4'>
      {data?.posts.map(post => <PostPreview key={post._id} {...post} />)}
      {data && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          setPage={(page) => setSearchParams({ ...searchParams, page: page.toString() })}
        />
      )}
    </ul>
  )
}

export default Home