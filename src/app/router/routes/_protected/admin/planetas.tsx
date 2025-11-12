import { Planets } from '@/features/admin/pages/Planets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/planetas')({
  component: Planets,
})
