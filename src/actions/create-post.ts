import { ActionFunctionArgs, redirect } from 'react-router-dom'

import auth from '../lib/auth'

export const createPostAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const postData = {
    title: formData.get('title'),
    link: formData.get('link'),
    body: formData.get('text')
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.getJWT()}`
    },
    body: JSON.stringify(postData)
  })

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  return redirect('/')
}