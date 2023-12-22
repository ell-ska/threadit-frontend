import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validateSignIn } from '../lib/validation'
import auth from '../lib/auth'

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')

  const { data, error } = await client.post('/sign-in', {
    body: { username, password }
  })

  if (error) return toast(error)

  const validatedData = validateSignIn(data)
  if (!validatedData) return null

  const { token, refreshToken, userId } = validatedData
  auth.signIn(token, refreshToken, userId)

  return redirect('/')
}