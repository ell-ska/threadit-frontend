import { useNavigate } from 'react-router-dom'

import PostHeader from './PostHeader'
import Toolbar from './Toolbar'
import { Post as TPost } from '../types'

type PostProps = TPost

const PostPreview = ({ _id, createdAt, title, link, commentCount, upvotes, downvotes, score }: PostProps) => {
  const navigate = useNavigate()

  return (
    <li
      role='button'
      onClick={() => navigate(`post/${_id}`)}
      className='group h-40 bg-white rounded-2xl flex justify-between items-center overflow-hidden hover:bg-zinc-100 transition'
    >
      <div className='p-4 flex flex-col gap-6 justify-between h-full'>
        <div className='md:space-y-2'>
          <PostHeader
            thread='general'
            createdAt={createdAt}
          />
          <h3 className='text-xl font-bold'>{title}</h3>
        </div>
        <Toolbar
          postId={_id}
          score={score}
          upvotes={upvotes}
          downvotes={downvotes}
          comments={commentCount}
        />
      </div>
      {link?.image && (
        <img
          src={link.image}
          className='h-full object-cover object-center'
        />
      )}
    </li>
  )
}

export default PostPreview