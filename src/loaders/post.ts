import { LoaderFunctionArgs } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validatePost } from '../lib/validation'

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params

  const { data, error } = await client.get(`/posts/${id}`)

  if (error) return toast(error)

  const validatedData = validatePost(data)
  if (!validatedData) return null

  return validatedData
}