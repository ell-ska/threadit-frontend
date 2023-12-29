import { LoaderFunctionArgs } from 'react-router-dom'
import { toast } from 'sonner'

import { client } from '../lib/client'
import { validatePost } from '../lib/validation'

export const post = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params

  const { data, error } = await client.get(`/posts/${id}`)

  if (error) {
    toast(error)
    return null
  }

  const validatedData = validatePost(data)
  if (!validatedData) return null

  return validatedData
}