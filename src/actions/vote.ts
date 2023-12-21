import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { client } from '../lib/client'

export const voteAction = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params
  const formData = await request.formData()

  const vote = formData.get('vote')
  const path = `/posts/${postId}/${vote}vote`

  const { error } = await client.post(path, { withAuth: true })

  if (error) return error
  return redirect(formData.get('returnTo')?.toString() || '/')
}