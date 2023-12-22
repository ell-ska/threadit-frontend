import { z } from 'zod'
import { toast } from 'sonner'

const validate = <T>(schema: z.ZodType<T>, data: unknown) => {
  const { success } = schema.safeParse(data)

  if (!success) {
    toast('something went terribly wrong')
    return undefined
  } else {
    return data as z.infer<typeof schema>
  }
}

const singInSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  userId: z.string()
})

export const validateSignIn = (data: unknown) => validate(singInSchema, data)