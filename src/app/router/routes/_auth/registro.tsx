import { Register } from '@/features/auth/pages/Register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/registro')({
  component: Register,
})
