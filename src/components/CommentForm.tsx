import { useRef } from 'react'
import { useFetcher } from 'react-router-dom'

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
    <div>
      <h3>Leave a comment</h3>
      <fetcher.Form method='post' action={`/posts/${postId}/comments`}>
        <label htmlFor='body' hidden>Add a comment</label>
        <textarea
          ref={ref}
          className={inputVariants({ className: 'w-2/3 min-h-[12rem]' })}
          name='body'
          id='body'
          placeholder='Add a comment'
          required
        />
        <Button type='submit'>Post comment</Button>
      </fetcher.Form>
    </div>
  )
}

export default CommentForm