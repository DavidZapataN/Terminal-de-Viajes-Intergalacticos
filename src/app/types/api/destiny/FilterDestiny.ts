export type AtmosphereType = 'breathable' | 'not breathable' | 'toxic' | 'none'

export interface FilterDestiny {
  name?: string
  system?: string

  atmosphere?: AtmosphereType

  minPrice?: number
  maxPrice?: number
  minDistance?: number
  maxDistance?: number
  minTemperature?: number
  maxTemperature?: number

  page?: number
  limit?: number

  sortBy?: 'name' | 'price' | 'distance' | 'averageTemperature'
  order?: 'ASC' | 'DESC'
}
