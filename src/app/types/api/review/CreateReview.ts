export interface CreateReview {
  authorId: number
  destinyId: number
  content: string
  rating: 1 | 2 | 3 | 4 | 5
}
