import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'

export const deletePost = async ({ params }: ActionFunctionArgs) => {
  const { id } = params

  const { error } = await client.delete(`/posts/${id}`, {
    withAuth: true
  })

  if (error) {
    toast(error)
    return null
  }

  return redirect('/')
}