import { ActionFunctionArgs, redirect } from 'react-router-dom'

import auth from '../lib/auth'

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/sign-in', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  const { token } = await response.json()
  auth.signIn(token)

  return redirect('/')
}