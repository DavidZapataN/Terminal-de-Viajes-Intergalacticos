import type { Cabin } from './Cabin'

export interface Starship {
  id: number
  name: string
  class: string
  capacity: number
  status: 'active' | 'maintenance' | 'unavailable'
  amenities: string[]
  cabins: Cabin[]
}
