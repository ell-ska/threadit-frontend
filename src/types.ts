import {
  Post as _Post,
  Comment as _Comment,
  Feed as _Feed
} from './lib/validation'

export type ActionData = { message: string } | undefined
export type Post = _Post
export type Comment = _Comment
export type Feed = _Feed & { page: number }