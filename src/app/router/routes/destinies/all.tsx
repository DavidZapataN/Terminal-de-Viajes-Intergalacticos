import { Destinies } from '@/features/destinies/pages/Destinies'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/destinies/all')({
  component: Destinies,
})
