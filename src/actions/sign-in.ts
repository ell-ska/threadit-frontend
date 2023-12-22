import { ActionFunctionArgs, redirect } from 'react-router-dom'

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

  if (error) return error

  const { validatedData, validationError } = validateSignIn(data)
  if (validationError || !validatedData) return validationError

  const { token, refreshToken, userId } = validatedData
  auth.signIn(token, refreshToken, userId)

  return redirect('/')
}