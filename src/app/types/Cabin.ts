import { type Starship } from './Starship'

export interface Cabin {
  id: number
  name: string
  description: string
  price: number
  starship?: Starship
}
