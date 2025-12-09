import type { User } from './User'

export interface Review {
  id: number
  author: User
  content: string
  rating: 1 | 2 | 3 | 4 | 5
  createdAt: string
  likedByUsers: number[]
  destinyId: number
}
