import { Booking } from '@/features/booking/pages/Booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking')({
  component: Booking,
})
