import { z } from 'zod'
import { toast } from 'sonner'

const validate = <T>(schema: z.ZodType<T>, data: unknown) => {
  const parsed = schema.safeParse(data)
  
  if (!parsed.success) {
    console.log(parsed)
    toast('something went terribly wrong')
    return undefined
  } else {
    return parsed.data as z.infer<typeof schema>
  }
}

const singInSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  userId: z.string()
})

const refreshTokenSchema = z.object({
  token: z.string()
})

const authorSchema = z.union([
  z.object({
    _id: z.string(),
    username: z.string()
  }),
  z.string()
])

const commentSchema = z.object({
  _id: z.string(),
  body: z.string(),
  author: authorSchema
})

const postSchema = z.object({
  _id: z.string(),
  title: z.string(),
  link: z.object({
    url: z.string().url(),
    image: z.string().url().optional()
  }).optional(),
  body: z.string().optional(),
  image: z.object({
    _id: z.string(),
    mimeType: z.string(),
    size: z.number()
  }).optional(),
  author: authorSchema,
  comments: commentSchema.array().optional(),
  commentCount: z.number().optional(),
  upvotes: z.string().array().optional(),
  downvotes: z.string().array().optional(),
  score: z.number()
})

const feedSchema = z.object({
  posts: postSchema.array(),
  totalPages: z.number()
})

export const validateSignIn = (data: unknown) => validate(singInSchema, data)
export const validateToken = (data: unknown) => validate(refreshTokenSchema, data)
export const validatePost = (data: unknown) => validate(postSchema, data)
export const validateFeed = (data: unknown) => validate(feedSchema, data)

export type Post = z.infer<typeof postSchema>
export type Comment = z.infer<typeof commentSchema>
export type Feed = z.infer<typeof feedSchema>