export interface Starship {
  id: string
  name: string
  class: string
  capacity: number
  speed: number
  status: 'active' | 'maintenance' | 'unavailable'
  amenities: string[]
}
