import { Form, useLocation, useNavigate } from 'react-router-dom'
import { ArrowBigDown, ArrowBigUp, MessageCircle, Trash, Pencil } from 'lucide-react'

import auth from '../lib/auth'
import { cn } from '../utils/classnames'
import Button from './ui/Button'

type ToolbarProps = {
  postId: string
  score: number
  upvotes: string[] | undefined
  downvotes: string[] | undefined
  comments: number | undefined
  authorId?: string
}

const Toolbar = ({ postId, score, comments, upvotes, downvotes, authorId }: ToolbarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const userId = auth.getUser()
  const isHomePage = location.pathname === '/'

  return (
    <div className='flex gap-4 items-center'>
      <div className='flex gap-1 items-center rounded-full bg-zinc-100 group-hover:bg-zinc-200 transition'>
        <Form method='post' action={`/posts/${postId}/vote`}>
          <input type='hidden' value='up' name='vote' />
          <input type='hidden' value={location.pathname + location.search} name='returnTo' />
          <Button
            size='icon'
            variant='ghost'
            className='hover:bg-zinc-50 hover:text-secondary p-1 md:p-2'
          >
            <ArrowBigUp
              className={cn(
                'size-5 md:size-6',
                userId && upvotes?.includes(userId) && 'stroke-secondary fill-secondary'
              )}
            />
          </Button>
        </Form>
        <span>{score}</span>
        <Form method='post' action={`/posts/${postId}/vote`}>
          <input type='hidden' value='down' name='vote' />
          <input type='hidden' value={location.pathname + location.search} name='returnTo' />
          <Button
            size='icon'
            variant='ghost'
            className='hover:bg-zinc-50 hover:text-primary p-1 md:p-2'
          >
            <ArrowBigDown className={cn(
                'size-5 md:size-6',
                userId && downvotes?.includes(userId) && 'stroke-primary fill-primary'
              )}
            />
          </Button>
        </Form>
      </div>

      <div className='bg-zinc-100 rounded-full group-hover:bg-zinc-200 transition'>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            navigate(
              isHomePage
                ? `post/${postId}/#comments`
                : '#comments'
            )
          }}
          size='icon'
          variant='ghost'
          className='hover:bg-zinc-50 p-1 md:p-2'
        >
          <MessageCircle className='size-5 md:size-6'/>
          <span>{comments}</span>
        </Button>
      </div>
      
      {!isHomePage && authorId === userId && (
        <>
          <Form method='delete' action={`/posts/delete/${postId}`}>
            <Button size='icon' variant='ghost' className='bg-zinc-100 hover:bg-zinc-50'>
              <Trash />
            </Button>
          </Form>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/post/${postId}/edit`)
            }}
            size='icon'
            variant='ghost'
            className='bg-zinc-100 hover:bg-zinc-50'
          >
            <Pencil />
          </Button>
        </>
      )}
    </div>
  )
}

export default Toolbar