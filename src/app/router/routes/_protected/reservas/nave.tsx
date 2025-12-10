import { BookingStarshipStep } from '@/features/booking/pages/BookingStarshipStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reservas/nave')({
  component: BookingStarshipStep,
})
