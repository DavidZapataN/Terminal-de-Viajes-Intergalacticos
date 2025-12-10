import { BookingPaymentStep } from '@/features/booking/pages/BookingPaymentStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reservas/pago')({
  component: BookingPaymentStep,
})
