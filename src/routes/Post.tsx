import { Link, useLoaderData } from 'react-router-dom'

import Button from '../components/ui/Button'
import PostHeader from '../components/PostHeader'
import Toolbar from '../components/Toolbar'
import CommentForm from '../components/CommentForm'
import Comment from '../components/Comment'
import { Post as TPost } from '../types'

const Post = () => {
  const post = useLoaderData() as TPost | null

  if (!post) return null

  return (
    <>
      <article className='flex justify-between items-start mt-12'>
        <div>
          <PostHeader
            username={typeof post.author !== 'string' ? post.author.username : undefined}
            thread='general'
            createdAt={post.createdAt}
          />
          <h1 className='text-3xl font-bold mt-2'>{post.title}</h1>
          {post.body && <p className='w-4/5 mt-4'>{post.body}</p>}
        </div>
        <div className='space-y-4'>
          {post.link && (
            <Link to={post.link.url} className='block shrink-0 max-w-xs rounded-2xl border border-zinc-200 overflow-hidden'>
              {post.link.image && <img src={post.link.image} className='border-b border-zinc-200' />}
              <div className='flex justify-between gap-8 items-center px-4 py-2'>
                <span>{new URL(post.link.url).hostname}</span>
                <Button size='sm'>Open</Button>
              </div>
            </Link>
          )}
          <Toolbar
            postId={post._id}
            score={post.score}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            comments={post.comments?.length}
          />
        </div>
      </article>
      <div id='comments' className='mt-12 flex flex-col items-center'>
        <CommentForm postId={post._id} />
        <div className='space-y-4 mt-6 w-3/4'>
          {post.comments?.sort((a, b) => {
            const aDate = new Date(a.createdAt)
            const bDate = new Date(b.createdAt)

            if (aDate > bDate) return -1
            if (aDate < bDate) return 1
            return 0
          }).map(comment => (
            <Comment
              key={comment._id}
              {...comment}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Post