import { BookingCabinStep } from '@/features/booking/pages/BookingCabinStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reservas/cabina')({
  component: BookingCabinStep,
})
