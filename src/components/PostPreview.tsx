import { useNavigate } from 'react-router-dom'

import Toolbar from './Toolbar'
import { Post as TPost } from '../types'

type PostProps = TPost

const PostPreview = ({ _id, title, link, author }: PostProps) => {
  const navigate = useNavigate()

  return (
    <li
      role='button'
      onClick={() => navigate(`post/${_id}`)}
      className='group h-40 bg-white rounded-2xl flex justify-between items-center overflow-hidden hover:bg-zinc-100 transition'
    >
      <div className='p-4'>
        <span>u/{author.username}</span>
        <h3 className='text-xl font-bold mb-6'>{title}</h3>
        <Toolbar upvotes={64} comments={16} />
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