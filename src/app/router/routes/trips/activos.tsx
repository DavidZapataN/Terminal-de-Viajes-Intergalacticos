import { ActiveTrips } from '@/features/trips/pages/ActiveTrips'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trips/activos')({
  component: ActiveTrips,
})
