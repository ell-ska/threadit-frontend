import { Link, useLoaderData } from 'react-router-dom'

import CommentForm from '../components/CommentForm'
import Button from '../components/ui/Button'
import { Post as TPost } from '../types'

const Post = () => {
  const post = useLoaderData() as TPost | null

  if (!post) return null

  return (
    <>
      <article className='flex justify-between items-start mt-12'>
        <div>
          <h1 className='text-3xl font-bold'>{post.title}</h1>
          {post.body && <p className='w-3/4 mt-4'>{post.body}</p>}
        </div>
        {post.link && (
          <Link to={post.link.url} className='block max-w-xs rounded-2xl border border-zinc-200 overflow-hidden'>
            {post.link.image && <img src={post.link.image} className='border-b border-zinc-200' />}
            <div className='flex justify-between gap-8 items-center px-4 py-2'>
              <span>{new URL(post.link.url).hostname}</span>
              <Button size='sm'>Open</Button>
            </div>
          </Link>
        )}
      </article>
      <div id='comments'>
        <CommentForm postId={post._id} />
        {post.comments?.map(comment => <p key={comment._id}>{comment.body}</p>)}
      </div>
    </>
  )
}

export default Post