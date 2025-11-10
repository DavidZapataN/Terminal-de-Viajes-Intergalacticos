export interface Review {
  id: string
  planetId: string
  userId: string
  rating: 1 | 2 | 3 | 4 | 5
  date: string
  comment: string
  helpful: string[]
}
