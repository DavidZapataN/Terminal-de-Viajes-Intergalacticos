import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireLogin } from '@/lib/utils'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    requireLogin(location.pathname)
  },
  component: () => <Outlet />,
})
