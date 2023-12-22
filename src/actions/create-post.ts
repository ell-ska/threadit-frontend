import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'

export const createPostAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const { error } = await client.post('/posts', {
    withAuth: true,
    override: {
      headers: {},
      body: formData
    }
  })
  
  if (error) return toast(error)
  return redirect('/')
}