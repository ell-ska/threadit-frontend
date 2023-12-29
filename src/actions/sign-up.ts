import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'

export const signUpAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('password-confirmation')

  if (password !== passwordConfirmation) {
    return toast("passwords don't match")
  }

  const { error } = await client.post('/sign-up', {
    body: { username, password }
  })

  if (error) {
    toast(error)
    return null
  }
  
  return redirect('/sign-in')
}