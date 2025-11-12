import { CompletedTrips } from '@/features/trips/pages/CompletedTrips'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/viajes/completados')({
  component: CompletedTrips,
})
