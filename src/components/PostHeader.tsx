import { formatDistanceToNow } from 'date-fns'

type PostHeaderProps = {
  username?: string
  thread: string | undefined
  createdAt: string
}

const PostHeader = ({ username, thread, createdAt }: PostHeaderProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row flex-wrap gap-x-2 items-center'>
        {/* <div className='size-4 bg-secondary rounded-full' /> */}
        <span className='text-sm'>t/{thread || 'general'}</span>
        <span className='text-xs text-zinc-600'>{formatDistanceToNow(createdAt)} ago</span>
      </div>
      {username && <span className='text-sm text-zinc-600'>{username}</span>}
    </div>
  )
}

export default PostHeader