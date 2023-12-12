import { ActionFunctionArgs, redirect } from 'react-router-dom'

export const signUpAction = async (args: ActionFunctionArgs) => {
  const { request } = args
  const formData = await request.formData()

  const username = formData.get('username')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('password-confirmation')

  if (password !== passwordConfirmation) {
    return { message: "passwords don't match" }
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/sign-up', {
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

  return redirect('/sign-in')
}