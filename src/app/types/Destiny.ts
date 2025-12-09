import type { Activity } from './Activity'
import type { AtmosphereType } from './api/destiny/FilterDestiny'
import type { ReviewSummary } from './ReviewSummary'

export interface Destiny {
  id: number
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
  likedByUsers: number[]
  activities: Activity[]
  reviewSummary: ReviewSummary
}
