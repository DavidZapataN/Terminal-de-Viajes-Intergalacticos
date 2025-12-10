import { BookingConfirmationStep } from '@/features/booking/pages/BookingConfirmationStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reservas/confirmacion')({
  component: BookingConfirmationStep,
})
