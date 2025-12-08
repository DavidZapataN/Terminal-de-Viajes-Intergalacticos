import { SecurityPage } from '@/features/profile/pages/SecurityPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/perfil/seguridad')({
  component: SecurityPage,
})
