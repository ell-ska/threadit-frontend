import { LoaderFunctionArgs } from 'react-router-dom'

export const homeLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page') || 1

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts' + `?page=${page}`, {
    headers: {
      'Accepts': 'application/json'
    }
  })

  const data = await response.json()

  return { page, ...data }
}