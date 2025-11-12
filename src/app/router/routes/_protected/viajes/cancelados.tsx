import { CanceledTrips } from '@/features/trips/pages/CanceledTrips'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/viajes/cancelados')({
  component: CanceledTrips,
})
