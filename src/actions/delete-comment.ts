import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'

export const deleteComment = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params
  const formData = await request.formData()
  const commentId = formData.get('commentId')

  const { error } = await client.delete(`/posts/${postId}/comments/${commentId}`, {
    withAuth: true
  })

  if (error) {
    toast(error)
    return null
  }

  return redirect(formData.get('returnTo')?.toString() || '/')
}