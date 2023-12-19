import { ActionFunctionArgs, redirect } from 'react-router-dom'

import auth from '../lib/auth'
import { client } from '../lib/client'

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')

  const { data, error } = await client.post('/sign-in', {
    body: { username, password }
  })

  if (error) return error

  const { token, refreshToken } = data
  auth.signIn(token, refreshToken)

  return redirect('/')
}