import type { Cabin } from './Cabin'

export interface StarshipOld {
  id: string
  name: string
  class: string
  capacity: number
  speed: number
  status: 'active' | 'maintenance' | 'unavailable'
  amenities: string[]
}

export interface Starship {
  id: number
  name: string
  class: string
  capacity: number
  status: 'active' | 'maintenance' | 'unavailable'
  amenities: string[]
  cabins: Cabin[]
}
