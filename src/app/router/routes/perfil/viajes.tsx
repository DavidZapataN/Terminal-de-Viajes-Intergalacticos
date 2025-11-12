import { Trips } from '@/features/profile/pages/TripsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/perfil/viajes')({
  component: Trips,
})
