import { ActionFunctionArgs } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validatePost } from '../lib/validation'

export const addCommentAction = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params
  const formData = await request.formData()

  const { data, error } = await client.post(`/posts/${postId}/comments`, {
    withAuth: true,
    body: { comment: formData.get('body') }
  })

  if (error) {
    toast(error)
    return null
  }
  
  const validatedData = validatePost(data)
  if (!validatedData) return null

  return { comments: validatedData.comments }
}