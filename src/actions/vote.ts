import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'

export const voteAction = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params
  const formData = await request.formData()

  const vote = formData.get('vote')
  const path = `/posts/${postId}/${vote}vote`

  const { error } = await client.post(path, { withAuth: true })

  if (error) {
    toast(error)
    return null
  }
  
  return redirect(formData.get('returnTo')?.toString() || '/')
}