import { LoaderFunctionArgs } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validateFeed } from '../lib/validation'

export const homeLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page') || '1'

  const { data, error } = await client.get('/posts' + `?page=${page}`)
  console.log(data)

  if (error) {
    toast(error)
    return null
  }

  const validatedData = validateFeed(data)
  if (!validatedData) return null

  return { page, ...validatedData }
}