import type { CreateCabin } from './CreateCabin'

export interface CreateStarship {
  name: string
  class: string
  capacity: number
  status: 'active' | 'maintenance' | 'unavailable'
  amenities: string[]
  cabins: CreateCabin[]
}
