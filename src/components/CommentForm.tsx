import { useRef } from 'react'
import { useFetcher } from 'react-router-dom'
import { Send } from 'lucide-react'

import Button from './ui/Button'
import { inputVariants } from './ui/Input'

type CommentFormProps = {
  postId: string
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const fetcher = useFetcher({ key: `comment-form-${postId}` })
  const ref = useRef<HTMLTextAreaElement>(null)

  if (fetcher.data && ref.current) {
    ref.current.value = ''
  }

  return (
    <fetcher.Form
      method='post'
      action={`/posts/${postId}/comments`}
      className='card p-2 flex gap-4 items-end w-3/4 border border-white focus-within:border-secondary'
    >
      <label htmlFor='body' hidden>Leave a comment</label>
      <textarea
        ref={ref}
        className={inputVariants({ className: 'w-full min-h-[8rem] border-none resize-none' })}
        name='body'
        id='body'
        placeholder='Write your comment'
        required
      />
      <Button type='submit' className='whitespace-nowrap'>
        <Send />
      </Button>
    </fetcher.Form>
  )
}

export default CommentForm