import { ActionFunctionArgs } from 'react-router-dom'

export const signInAction = async (args: ActionFunctionArgs) => {
  const { request } = args
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
  console.log(token)

  return null
  // return redirect('/')
}