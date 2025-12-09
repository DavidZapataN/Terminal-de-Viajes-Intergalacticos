import type { CreateActivity } from './CreateActivity'
import type { AtmosphereType } from './FilterDestiny'

export interface CreateDestiny {
  name: string
  description: string
  images: string[]
  gravity: number
  system: string
  dayNightCycle: number
  atmosphere: AtmosphereType
  population: number
  averageTemperature: number
  distance: number
  position: { x: number; y: number }
  price: number
  activities: CreateActivity[]
}
