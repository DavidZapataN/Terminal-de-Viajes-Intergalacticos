import type { CreateStarship } from './CreateStarship'

export interface UpdateStarship extends Partial<
  Omit<CreateStarship, 'cabins'>
> {}
