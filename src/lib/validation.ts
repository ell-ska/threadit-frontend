import { z } from 'zod'

const validate = <T>(schema: z.ZodType<T>, data: unknown) => {
  const { success } = schema.safeParse(data)

  if (!success) return { validationError: { message: 'something went terribly wrong' }  }
  return { validatedData: data as z.infer<typeof schema> }
}

const singInSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  userId: z.string()
})

export const validateSignIn = (data: unknown) => validate(singInSchema, data)