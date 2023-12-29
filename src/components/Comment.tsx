import { formatDistanceToNow } from 'date-fns'

import { Comment as TComment } from '../types'

type CommentProps = TComment

const Comment = ({ body, author: _author, createdAt }: CommentProps) => {
  const author = typeof _author !== 'string' ? _author.username : 'nameless'

  return (
    <div className='card flex flex-col gap-2 p-4'>
      <div className='flex flex-col md:flex-row md:gap-2 md:items-center'>
        <span className='text-sm'>u/{author}</span>
        <span className='text-xs text-zinc-600'>{formatDistanceToNow(createdAt)} ago</span>
      </div>
      <p>{body}</p>
    </div>
  )
}

export default Comment