export type ActionData = { message: string } | undefined

type Author = {
  _id: string
  username: string
}

export type Comment = {
  _id: string
  body: string
  author: Author
}

export type Post = {
  _id: string
  title: string
  link?: {
    url: string
    image?: string
  }
  body?: string
  author: Author
  comments?: Comment[]
}