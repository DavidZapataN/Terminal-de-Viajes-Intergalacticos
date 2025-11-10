import { CanceledTrips } from '@/features/trips/pages/CanceledTrips'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trips/cancelados')({
  component: CanceledTrips,
})
