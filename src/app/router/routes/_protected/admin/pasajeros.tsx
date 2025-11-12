import { Passengers } from '@/features/admin/pages/Passsengers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/pasajeros')({
  component: Passengers,
})
