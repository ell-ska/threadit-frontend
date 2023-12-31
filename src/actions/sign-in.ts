import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validateSignIn } from '../lib/validation'
import auth from '../lib/auth'

export const signIn = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')

  const { data, error } = await client.post('/sign-in', {
    body: { username, password }
  })

  if (error) {
    toast(error)
    return null
  }
  
  const validatedData = validateSignIn(data)
  if (!validatedData) return null

  const { token, refreshToken, userId } = validatedData
  auth.signIn(token, refreshToken, userId)

  return redirect('/')
}