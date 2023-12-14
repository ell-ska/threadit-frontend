import { useLoaderData } from 'react-router-dom'

import { Post as TPost } from '../types'
import PostPreview from '../components/PostPreview'

const Home = () => {
  const data = useLoaderData() as { posts: TPost[], totalPages: number } | undefined

  return (
    <ul className='flex flex-col gap-4 mb-8'>
      {data?.posts.map(post => <PostPreview key={post._id} {...post} />)}
    </ul>
  )
}

export default Home