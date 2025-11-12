import { Booking } from '@/features/booking/pages/Booking'
import { requireLogin } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reservas')({
  component: Booking,
  beforeLoad: async ({ location }) => {
    requireLogin(location.pathname)
  },
})
