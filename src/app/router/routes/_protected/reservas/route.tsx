import { BookingLayout } from '@/features/booking/pages/BookingLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reservas')({
  component: BookingLayout,
  beforeLoad: async ({ location }) => {
    if (location.pathname.replace(/\/$/, '') === '/reservas') {
      throw redirect({ to: '/reservas/fechas' })
    }
  },
})
