import { Form, useLocation } from 'react-router-dom'
import { ArrowBigDown, ArrowBigUp, MessageCircle } from 'lucide-react'

import Button from './ui/Button'

type ToolbarProps = {
  postId: string
  score: number
  upvotes: string[]
  downvotes: string[]
  comments: number
}

const Toolbar = ({ postId, score, comments }: ToolbarProps) => {
  const location = useLocation()

  return (
    <div className='flex gap-4 items-center'>
      <div className='flex gap-1 items-center rounded-full bg-zinc-100 group-hover:bg-zinc-200 transition'>
        <Form method='post' action={`/posts/${postId}/vote`}>
          <input type='hidden' value='up' name='vote' />
          <input type='hidden' value={location.pathname + location.search} name='returnTo' />
          <Button
            size='icon'
            variant='ghost'
            className='hover:text-secondary hover:bg-zinc-50'
          >
            <ArrowBigUp />
          </Button>
        </Form>
        <span>{score}</span>
        <Form method='post' action={`/posts/${postId}/vote`}>
          <input type='hidden' value='down' name='vote' />
          <input type='hidden' value={location.pathname + location.search} name='returnTo' />
          <Button
            size='icon'
            variant='ghost'
            className='hover:text-primary hover:bg-zinc-50'
          >
            <ArrowBigDown />
          </Button>
        </Form>
      </div>

      <div className='bg-zinc-100 rounded-full group-hover:bg-zinc-200 transition'>
        <Button
          onClick={e => e.stopPropagation()}
          size='icon'
          variant='ghost'
          className='hover:bg-zinc-50'
        >
          <MessageCircle />
          <span>{comments}</span>
        </Button>
      </div>
    </div>
  )
}

export default Toolbar