import { Summary } from '@/features/admin/pages/SummaryPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/resumen')({
  component: Summary,
})
