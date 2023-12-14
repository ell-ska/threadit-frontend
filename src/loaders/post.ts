import { LoaderFunctionArgs } from 'react-router-dom'

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts' + `/${id}`, {
    headers: {
      'Accepts': 'application/json'
    }
  })

  return await response.json()
}