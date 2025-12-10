import { BookingDatesStep } from '@/features/booking/pages/BookingDatesStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reservas/fechas')({
  component: BookingDatesStep,
})
