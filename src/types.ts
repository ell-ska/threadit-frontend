export type ActionData = { message: string } | undefined 

export type Post = {
  _id: string
  title: string
  link?: {
    url: string
    image?: string
  }
  body?: string
  author: {
    _id: string
    username: string
  }
}