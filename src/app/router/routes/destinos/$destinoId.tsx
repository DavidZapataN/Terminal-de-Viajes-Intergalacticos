import { PlanetInfo } from '@/features/destinies/pages/PlanetInfo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/destinos/$destinoId')({
  component: PlanetInfo,
})
