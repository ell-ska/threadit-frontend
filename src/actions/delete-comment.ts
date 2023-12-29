import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validatePost } from '../lib/validation'

export const deleteComment = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params
  const formData = await request.formData()
  const commentId = formData.get('commentId')

  const { data, error } = await client.delete(`/posts/${postId}/comments/${commentId}`, {
    withAuth: true
  })

  if (error) {
    toast(error)
    return null
  }
  
  const validatedData = validatePost(data)
  if (!validatedData) return null

  return redirect(formData.get('returnTo')?.toString() || '/')
}