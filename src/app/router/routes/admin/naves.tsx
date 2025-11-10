import { Starships } from '@/features/admin/pages/Starships'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/naves')({
  component: Starships,
})
