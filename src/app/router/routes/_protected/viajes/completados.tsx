import { CompletedTrips } from '@/features/trips/pages/CompletedTrips'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/viajes/completados')({
  component: CompletedTrips,
})
