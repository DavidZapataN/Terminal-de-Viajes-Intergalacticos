import { Planets } from '@/features/admin/pages/Planets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/planetas')({
  component: Planets,
})
