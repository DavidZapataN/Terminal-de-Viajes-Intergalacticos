import type { Cabin } from '../../Cabin'

export interface AvailableStarship {
  id: number
  name: string
  class: string
  capacity: number
  status: string
  amenities: string[]
  cabins: Cabin[]
  availableCapacity: number
}

export interface GetAvailableStarshipsParams {
  destinyId: number
  departureDate: string
  returnDate: string
}
