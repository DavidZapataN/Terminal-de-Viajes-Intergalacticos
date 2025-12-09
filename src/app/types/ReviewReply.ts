import type { User } from './User'

export interface ReviewReply {
  id: number
  author: User
  content: string
  createdAt: string
  reviewId: number
}
