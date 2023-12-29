import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'

export const editPost = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const { id } = params

  const { error } = await client.put(`/posts/${id}`, {
    withAuth: true,
    body: Object.fromEntries(formData.entries())
  })
  
  if (error) {
    toast(error)
    return null
  }
  
  return redirect(`/post/${id}`)
}