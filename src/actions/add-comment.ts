import { ActionFunctionArgs } from 'react-router-dom'

import { client } from '../lib/client'

export const addCommentAction = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params
  const formData = await request.formData()

  const { data, error } = await client.post(`/posts/${postId}/comments`, {
    withAuth: true,
    body: { comment: formData.get('body') }
  })

  if (error) return error
  return { comments: data.comments }
}