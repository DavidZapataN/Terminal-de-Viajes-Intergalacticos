import type { CreateDestiny } from './CreateDestiny'

export interface UpdateDestiny extends Partial<
  Omit<CreateDestiny, 'activities'>
> {}
