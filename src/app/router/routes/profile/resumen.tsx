import { Summary } from '@/features/profile/pages/SummaryPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/resumen')({
  component: Summary,
})
