import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { client } from '../lib/client'

export const createPostAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const postData = {
    title: formData.get('title'),
    link: formData.get('link'),
    body: formData.get('text')
  }

  const { error } = await client.post('/posts', {
    withAuth: true,
    body: postData
  })

  if (error) return error
  return redirect('/')
}