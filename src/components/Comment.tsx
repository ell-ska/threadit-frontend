import { Form, useLocation } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Trash } from 'lucide-react'

import auth from '../lib/auth'
import Button from './ui/Button'
import { Comment as TComment } from '../types'

type CommentProps = TComment & { postId: string }

const Comment = ({ postId, _id, body, author: _author, createdAt }: CommentProps) => {
  const location = useLocation()

  const author = typeof _author !== 'string' ? _author : undefined
  const userId = auth.getUser()

  return (
    <div className='card flex flex-col gap-2 p-4'>
      <div className='flex justify-between'>
        <div className='space-x-2'>
          <span className='text-sm'>u/{author?.username || 'nameless'}</span>
          <span className='text-xs text-zinc-600'>{formatDistanceToNow(createdAt)} ago</span>
        </div>
        {author?._id === userId && (
          <Form method='delete' action={`/posts/${postId}/comments/${_id}`}>
            <input type='hidden' value={_id} name='commentId' />
            <input type='hidden' value={location.pathname + location.search} name='returnTo' />
            <Button variant='ghost' size='xs'>
              <Trash size={18} />
            </Button>
          </Form>
        )}
      </div>
      <p>{body}</p>
    </div>
  )
}

export default Comment